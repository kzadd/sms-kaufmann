import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { smsSendActions } from '@app/features/sms-send/application/sms-send.actions'
import { smsSendFeature } from '@app/features/sms-send/application/sms-send.feature'
import { SmsSendIndividualForm, SmsSendIndividualKey } from '@app/features/sms-send/domain/sms-send.entity'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isChileanPhone, isRequired, maxLength } from '@app/shared/utils/validators.utils'

const SMS_SEND_INDIVIDUAL_ICONS = {
  cancelIcon: matCancel,
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
export class SmsSendIndividualContainerComponent {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _store = inject(Store)

  error = toSignal(this._store.select(smsSendFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(smsSendFeature.selectLoading), { initialValue: false })

  form: FormGroup<SmsSendIndividualForm> = this._formBuilder.group({
    message: this._formBuilder.control('testing', [isRequired, maxLength(200)]),
    phone: this._formBuilder.control('56931833042', [isRequired, isChileanPhone])
  })

  getErrorMessage(controlName: SmsSendIndividualKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleClearForm(): void {
    this.form.reset()
  }

  handleSend(): void {
    if (this.form.valid) {
      this._store.dispatch(smsSendActions.sendSmsIndividual({ smsSend: this.form.getRawValue() }))
    } else {
      this.form.markAllAsTouched()
    }
  }
}
