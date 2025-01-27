import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { smsSendActions } from '@app/features/sms-send/application/sms-send.actions'
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
export class SmsSendMassiveContainerComponent {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _store = inject(Store)

  form: FormGroup = this._formBuilder.group<SmsSendMassiveForm>({
    file: this._formBuilder.control('', [isRequired])
  })

  private _selectedFile: File | null = null

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

      this._store.dispatch(smsSendActions.sendSmsMassive({ smsSend: { file: base64File } }))
    } else {
      this.form.markAllAsTouched()
    }
  }
}
