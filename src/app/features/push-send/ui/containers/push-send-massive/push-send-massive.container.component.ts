import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'

import { pushSendActions } from '@app/features/push-send/application/push-send.actions'
import { pushSendFeature } from '@app/features/push-send/application/push-send.feature'
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
export class PushSendMassiveContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _store = inject(Store)

  applications = toSignal(this._store.select(pushSendFeature.selectApplications), { initialValue: [] })
  error = toSignal(this._store.select(pushSendFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(pushSendFeature.selectLoading), { initialValue: false })

  form: FormGroup = this._formBuilder.group<PushSendMassiveForm>({
    app: this._formBuilder.control('', [isRequired]),
    file: this._formBuilder.control<File | null>(null, [isRequired])
  })

  ngOnInit(): void {
    if (!this.applications().length) {
      this._store.dispatch(pushSendActions.getApplications())
    }
  }

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
