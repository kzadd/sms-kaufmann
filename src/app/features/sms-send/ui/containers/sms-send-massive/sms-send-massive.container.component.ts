import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'

import { SmsSendMassiveForm, SmsSendMassiveKey } from '@app/features/sms-send/domain/sms-send.entity'
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
export class SmsSendMassiveContainerComponent {
  private _formBuilder = inject(NonNullableFormBuilder)

  form: FormGroup<SmsSendMassiveForm> = this._formBuilder.group<SmsSendMassiveForm>({
    file: this._formBuilder.control<File | null>(null, [isRequired])
  })

  getErrorMessage(controlName: SmsSendMassiveKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleClearForm(): void {
    this.form.reset()
  }

  handleSend(): void {
    const { file } = this.form.getRawValue()

    if (this.form.valid) {
      console.log('enviando', { file })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
