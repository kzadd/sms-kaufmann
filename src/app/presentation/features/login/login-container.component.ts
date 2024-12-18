import { ChangeDetectionStrategy, Component, effect, inject, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { ENABLE_MOCKING } from '@shared/configs/environment.config'
import { CREDENTIALS_TEST_EMAIL, CREDENTIALS_TEST_PASSWORD } from '@shared/constants/app.constant'
import { BaseError } from '@shared/types/exception.types'
import { onClearState, onGetToken } from './application/login.actions'
import { loginFeature } from './application/login.feature'
import { LoginCredentials } from './domain/login.entity'

/**
 * Login container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  selector: 'app-login-container',
  standalone: true,
  styleUrl: './login-container.component.scss',
  templateUrl: './login-container.component.html'
})
export class LoginContainerComponent {
  private _fb = inject(FormBuilder)
  private _store = inject(Store)

  error$: Signal<BaseError | null | undefined> = toSignal(this._store.select(loginFeature.selectError))
  loading$: Signal<boolean | undefined> = toSignal(this._store.select(loginFeature.selectLoading))
  showPassword = false

  formGroup: FormGroup = this._fb.group({
    email: [
      { disabled: this.loading$(), value: ENABLE_MOCKING ? CREDENTIALS_TEST_EMAIL : '' },
      [Validators.required, Validators.email]
    ],
    password: [
      { disabled: this.loading$(), value: ENABLE_MOCKING ? CREDENTIALS_TEST_PASSWORD : '' },
      [Validators.required, Validators.minLength(6)]
    ]
  })

  constructor() {
    effect(() => {
      const isLoading = this.loading$()

      if (isLoading) {
        this.formGroup.controls['email'].disable()
        this.formGroup.controls['password'].disable()
      } else {
        this.formGroup.controls['email'].enable()
        this.formGroup.controls['password'].enable()
      }
    })
  }

  clearFormErrors() {
    if (this.error$()?.reason === 'UNAUTHORIZED_ERROR') {
      this._store.dispatch(onClearState())
    }
  }

  getErrors(field: string) {
    return this.formGroup.get(field)?.errors ?? {}
  }

  handleSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched()

      return
    }

    const credentials: LoginCredentials = this.formGroup.value

    this._store.dispatch(onGetToken(credentials))
  }

  handleTogglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  isFormInvalid() {
    const emailErrors = this.getErrors('email')
    const passwordErrors = this.getErrors('password')

    const hasErrors =
      !!emailErrors['email'] ||
      !!emailErrors['required'] ||
      !!passwordErrors['minlength'] ||
      !!passwordErrors['required']

    const isLoading = !!this.loading$()

    return hasErrors || isLoading
  }
}
