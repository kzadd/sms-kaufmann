import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'

import { PushSendMassiveForm, PushSendMassiveKey } from '@app/features/push-send/domain/push-send.entity'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isRequired } from '@app/shared/utils/validators.utils'

const PUSH_SEND_MASSIVE_ICONS = {
  cancelIcon: matCancel,
  sendIcon: matSend
}

/**
 * Push send massive container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ReactiveFormsModule],
  selector: 'app-push-send-massive-container',
  styleUrl: './push-send-massive.container.component.scss',
  templateUrl: './push-send-massive.container.component.html',
  viewProviders: [provideIcons(PUSH_SEND_MASSIVE_ICONS)]
})
export class PushSendMassiveContainerComponent {
  private _formBuilder = inject(NonNullableFormBuilder)

  form: FormGroup<PushSendMassiveForm> = this._formBuilder.group<PushSendMassiveForm>({
    app: this._formBuilder.control('', [isRequired]),
    file: this._formBuilder.control<File | null>(null, [isRequired])
  })

  getErrorMessage(controlName: PushSendMassiveKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleClearForm(): void {
    this.form.reset()
  }

  handleSend(): void {
    const { app, file } = this.form.getRawValue()

    if (this.form.valid) {
      console.log('enviando', { app, file })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
