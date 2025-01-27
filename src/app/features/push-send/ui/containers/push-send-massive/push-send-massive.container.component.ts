import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matError, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { pushSendActions } from '@app/features/push-send/application/push-send.actions'
import { pushSendFeature } from '@app/features/push-send/application/push-send.feature'
import { PushSendMassiveForm, PushSendMassiveKey } from '@app/features/push-send/domain/push-send.entity'
import { fileToBase64 } from '@app/shared/utils/base64.utils'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isRequired } from '@app/shared/utils/validators.utils'

const PUSH_SEND_MASSIVE_ICONS = {
  cancelIcon: matCancel,
  errorIcon: matError,
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
    file: this._formBuilder.control('', [isRequired])
  })

  private _selectedFile: File | null = null

  ngOnInit(): void {
    if (!this.applications().length) {
      this._store.dispatch(pushSendActions.getApplications())
    }

    this._store.select(pushSendFeature.selectPushSendState).subscribe(state => {
      if (state.loading) {
        this.form.disable()
      } else {
        this.form.enable()

        if (!state.applications.length) {
          this.form.get('app')?.disable()
        }
      }
    })
  }

  getErrorMessage(controlName: PushSendMassiveKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleCleanError(): void {
    if (this.error()) {
      this._store.dispatch(pushSendActions.clearError())
    }
  }

  handleClearForm(): void {
    this.form.reset()
    this._selectedFile = null
  }

  handleFileChange(event: Event): void {
    this.handleCleanError()
    const files = (event.target as HTMLInputElement).files

    if (files && files.length) {
      this._selectedFile = files[0]
    }
  }

  async handleSend(): Promise<void> {
    const { app } = this.form.getRawValue()

    if (app !== '' && this.form.valid && this._selectedFile) {
      const MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const base64File = await fileToBase64(this._selectedFile, MIME_TYPE)

      this._store.dispatch(pushSendActions.sendPushMassive({ pushSend: { app, file: base64File } }))

      this._store
        .select(pushSendFeature.selectPushSendState)
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
