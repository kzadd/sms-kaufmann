import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { smsSendActions } from '@app/features/sms-send/application/sms-send.actions'
import { smsSendFeature } from '@app/features/sms-send/application/sms-send.feature'
import { SmsSendMassiveForm, SmsSendMassiveKey } from '@app/features/sms-send/domain/sms-send.entity'
import { fileToBase64 } from '@app/shared/utils/base64.utils'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isRequired } from '@app/shared/utils/validators.utils'

const SMS_SEND_INDIVIDUAL_ICONS = {
  cancelIcon: matCancel,
  sendIcon: matSend
}

/**
 * Sms send massive container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ReactiveFormsModule],
  selector: 'app-sms-send-massive-container',
  styleUrl: './sms-send-massive.container.component.scss',
  templateUrl: './sms-send-massive.container.component.html',
  viewProviders: [provideIcons(SMS_SEND_INDIVIDUAL_ICONS)]
})
export class SmsSendMassiveContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _store = inject(Store)

  error = toSignal(this._store.select(smsSendFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(smsSendFeature.selectLoading), { initialValue: false })

  form: FormGroup = this._formBuilder.group<SmsSendMassiveForm>({
    file: this._formBuilder.control('', [isRequired])
  })

  private _selectedFile: File | null = null

  ngOnInit(): void {
    this._store.select(smsSendFeature.selectLoading).subscribe(loading => {
      if (!loading) {
        this.form.enable()
      }
    })
  }

  getErrorMessage(controlName: SmsSendMassiveKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleClearForm(): void {
    this.form.reset()
    this._selectedFile = null
  }

  handleFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files

    if (files && files.length) {
      this._selectedFile = files[0]
    }
  }

  async handleSend(): Promise<void> {
    if (this.form.valid && this._selectedFile) {
      const base64File = await fileToBase64(
        this._selectedFile,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )

      this.form.disable()
      this._store.dispatch(smsSendActions.sendSmsMassive({ smsSend: { file: base64File } }))

      this._store
        .select(smsSendFeature.selectSmsSendState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this.handleClearForm()
          }
        })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
