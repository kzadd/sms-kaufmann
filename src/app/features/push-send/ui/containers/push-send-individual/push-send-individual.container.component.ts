import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matCancel, matError, matSend } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { pushSendActions } from '@app/features/push-send/application/push-send.actions'
import { pushSendFeature } from '@app/features/push-send/application/push-send.feature'
import { PushSendIndividualForm, PushSendIndividualKey } from '@app/features/push-send/domain/push-send.entity'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isChileanRut, isRequired, maxLength } from '@app/shared/utils/validators.utils'

const PUSH_SEND_INDIVIDUAL_ICONS = {
  cancelIcon: matCancel,
  errorIcon: matError,
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
export class PushSendIndividualContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _store = inject(Store)

  applications = toSignal(this._store.select(pushSendFeature.selectApplications), { initialValue: [] })
  error = toSignal(this._store.select(pushSendFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(pushSendFeature.selectLoading), { initialValue: false })

  form: FormGroup = this._formBuilder.group<PushSendIndividualForm>({
    app: this._formBuilder.control('', [isRequired]),
    dni: this._formBuilder.control('', [isRequired, isChileanRut]),
    message: this._formBuilder.control('', [isRequired, maxLength(200)])
  })

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

  getErrorMessage(controlName: PushSendIndividualKey): string {
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
  }

  handleSend(): void {
    const { app } = this.form.getRawValue()

    if (app !== '' && this.form.valid) {
      this._store.dispatch(pushSendActions.sendPushIndividual({ pushSend: this.form.getRawValue() }))

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
