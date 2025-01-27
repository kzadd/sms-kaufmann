import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matError, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { smsSendActions } from '@app/features/sms-send/application/sms-send.actions'
import { smsSendFeature } from '@app/features/sms-send/application/sms-send.feature'
import { SmsSendIndividualForm, SmsSendIndividualKey } from '@app/features/sms-send/domain/sms-send.entity'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isChileanPhone, isRequired, maxLength } from '@app/shared/utils/validators.utils'

const SMS_SEND_INDIVIDUAL_ICONS = {
  cancelIcon: matCancel,
  errorIcon: matError,
  sendIcon: matSend
}

/**
 * Sms send individual container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ReactiveFormsModule],
  selector: 'app-sms-send-individual-container',
  styleUrl: './sms-send-individual.container.component.scss',
  templateUrl: './sms-send-individual.container.component.html',
  viewProviders: [provideIcons(SMS_SEND_INDIVIDUAL_ICONS)]
})
export class SmsSendIndividualContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _store = inject(Store)

  error = toSignal(this._store.select(smsSendFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(smsSendFeature.selectLoading), { initialValue: false })

  form: FormGroup = this._formBuilder.group<SmsSendIndividualForm>({
    message: this._formBuilder.control('', [isRequired, maxLength(200)]),
    phone: this._formBuilder.control('', [isRequired, isChileanPhone])
  })

  ngOnInit(): void {
    this._store.select(smsSendFeature.selectLoading).subscribe(loading => {
      if (loading) {
        this.form.disable()
      } else {
        this.form.enable()
      }
    })
  }

  getErrorMessage(controlName: SmsSendIndividualKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleCleanError(): void {
    if (this.error()) {
      this._store.dispatch(smsSendActions.clearError())
    }
  }

  handleClearForm(): void {
    this.form.reset()
  }

  handleSend(): void {
    if (this.form.valid) {
      this._store.dispatch(smsSendActions.sendSmsIndividual({ smsSend: this.form.getRawValue() }))

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
