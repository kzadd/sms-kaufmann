import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'

import { PushSendIndividualForm, PushSendIndividualKey } from '@app/features/push-send/domain/push-send.entity'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isChileanRut, isRequired, maxLength } from '@app/shared/utils/validators.utils'

const PUSH_SEND_INDIVIDUAL_ICONS = {
  cancelIcon: matCancel,
  sendIcon: matSend
}

/**
 * Push send individual container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ReactiveFormsModule],
  selector: 'app-push-send-individual-container',
  styleUrl: './push-send-individual.container.component.scss',
  templateUrl: './push-send-individual.container.component.html',
  viewProviders: [provideIcons(PUSH_SEND_INDIVIDUAL_ICONS)]
})
export class PushSendIndividualContainerComponent {
  private _formBuilder = inject(NonNullableFormBuilder)

  form: FormGroup<PushSendIndividualForm> = this._formBuilder.group({
    app: this._formBuilder.control('', [isRequired]),
    dni: this._formBuilder.control('', [isRequired, isChileanRut]),
    message: this._formBuilder.control('', [isRequired, maxLength(200)])
  })

  getErrorMessage(controlName: PushSendIndividualKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleClearForm(): void {
    this.form.reset()
  }

  handleSend(): void {
    const { app, dni, message } = this.form.getRawValue()

    if (this.form.valid) {
      console.log('enviando', { app, dni, message })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
