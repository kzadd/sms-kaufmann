import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { NgbAlert, NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'

import { ENABLE_MOCKING } from '@shared/configs/environment.config'
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE_MB,
  SMS_SEND_TEST_MESSAGE,
  SMS_SEND_TEST_PHONE
} from '@shared/constants/app.constant'
import { BaseError } from '@shared/types/exception.types'
import { onClearState, onSmsSend } from './application/sms-send.actions'
import { smsSendFeature } from './application/sms-send.feature'
import { SmsSendId, SmsSendIndividual, SmsSendMassive } from './domain/sms-send.entity'

function fileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File
    if (!file) return null

    const errors: ValidationErrors = {}

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      errors['fileSize'] = {
        actualSize: Math.round(file.size / (1024 * 1024)),
        maxSize: MAX_FILE_SIZE_MB
      }
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      errors['fileType'] = {
        actualType: file.type,
        allowedTypes: ['xlsx', 'xls', 'csv']
      }
    }

    return Object.keys(errors).length > 0 ? errors : null
  }
}

/**
 * Sms send container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbAlert, NgbNav, NgbNavContent, NgbNavItem, NgbNavLinkButton, NgbNavOutlet, ReactiveFormsModule],
  selector: 'app-sms-send-container',
  standalone: true,
  styleUrl: './sms-send-container.component.scss',
  templateUrl: './sms-send-container.component.html'
})
export class SmsSendContainerComponent {
  private _fb = inject(FormBuilder)
  private _store = inject(Store)

  activeTab = signal(1)
  fileName = ''
  error$: Signal<BaseError | null | undefined> = toSignal(this._store.select(smsSendFeature.selectError))
  loading$: Signal<boolean | undefined> = toSignal(this._store.select(smsSendFeature.selectLoading))
  success$: Signal<boolean | undefined> = toSignal(this._store.select(smsSendFeature.selectSuccess))

  individualFormGroup: FormGroup = this._fb.group({
    message: [
      { disabled: false, value: ENABLE_MOCKING ? SMS_SEND_TEST_MESSAGE : '' },
      { updateOn: 'blur', validators: [Validators.required] }
    ],
    phone: [
      { disabled: false, value: ENABLE_MOCKING ? SMS_SEND_TEST_PHONE : '' },
      { updateOn: 'blur', validators: [Validators.required, Validators.pattern(/^(\+?56)?[9]\d{8}$/)] }
    ]
  })

  massiveFormGroup: FormGroup = this._fb.group({
    file: [
      { disabled: false, value: null },
      { updateOn: 'blur', validators: [Validators.required, fileValidator()] }
    ]
  })

  activeForm = computed(() => (this.activeTab() === 1 ? this.individualFormGroup : this.massiveFormGroup))
  // isFormInvalid = computed(() => this.activeForm().invalid || this.loading$())

  constructor() {
    effect(() => {
      const isLoading = this.loading$()

      if (isLoading) {
        this.activeForm().disable()
      } else {
        this.activeForm().enable()
      }
    })

    effect(() => {
      const isError = this.error$()
      const isLoading = this.loading$()
      const isSuccess = this.success$()

      if (!isError && !isLoading && isSuccess) {
        this.handleClearForm()
      }
    })
  }

  clearFormErrors() {
    const isError = this.error$()

    if (isError) {
      this._store.dispatch(onClearState())
    }
  }

  getErrors(field: string) {
    return this.activeForm().get(field)?.errors ?? {}
  }

  handleClearForm() {
    this.activeForm().reset()
    this.fileName = ''
  }

  handleSmsSend() {
    if (this.activeForm().invalid) {
      this.activeForm().markAllAsTouched()

      return
    }

    if (this.activeTab() === 1) {
      const sms: SmsSendIndividual = {
        ...this.individualFormGroup.value,
        id: SmsSendId.INDIVIDUAL
      }

      this._store.dispatch(onSmsSend(sms))
    } else {
      const sms: SmsSendMassive = {
        file: this.massiveFormGroup.value.file,
        id: SmsSendId.MASSIVE
      }

      this._store.dispatch(onSmsSend(sms))
    }
  }

  handleTabChange() {
    this.handleClearForm()
  }

  isFormInvalid() {
    const hasErrors = this.activeForm().invalid
    const isLoading = !!this.loading$()

    return hasErrors || isLoading
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      this.fileName = file.name
      this.massiveFormGroup.patchValue({ file })
      this.massiveFormGroup.get('file')?.markAsTouched()
    }
  }

  getFileErrors(): string {
    const control = this.massiveFormGroup.get('file')
    if (!control?.errors) return ''

    if (control.errors['fileSize']) {
      return `El archivo no debe superar los ${MAX_FILE_SIZE_MB}MB`
    }
    if (control.errors['fileType']) {
      return 'Solo se permiten archivos Excel (.xlsx, .xls) o CSV'
    }
    return ''
  }
}
