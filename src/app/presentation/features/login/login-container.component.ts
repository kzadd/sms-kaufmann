import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { BaseError } from '@shared/types/exception.types'
import { onClearState, onGetToken } from './application/login.actions'
import { loginFeature } from './application/login.feature'
import { LoginCredentials } from './domain/login.entity'

/**
 * The Login container.
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

  loginForm: FormGroup = this._fb.group({
    email: ['test@admin.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  clearFormErrors() {
    if (this.error$()?.reason === 'UNAUTHORIZED_ERROR') {
      this._store.dispatch(onClearState())
    }
  }

  getErrors(field: string) {
    const control = this.loginForm.get(field)

    return control?.errors ?? {}
  }

  handleLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()

      return
    }

    const credentials: LoginCredentials = this.loginForm.value

    this._store.dispatch(onGetToken(credentials))
  }

  handleTogglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  isFormInvalid() {
    const emailErrors = this.getErrors('email')
    const passwordErrors = this.getErrors('password')

    return (
      this.loading$() ||
      !!emailErrors['email'] ||
      !!emailErrors['required'] ||
      !!passwordErrors['minlength'] ||
      !!passwordErrors['required']
    )
  }
}
