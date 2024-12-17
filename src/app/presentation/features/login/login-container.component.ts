import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { BaseError } from '@shared/types/exception.types'
import { onClearLoginError, onGetToken } from './application/login.actions'
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

  loginForm: FormGroup = this._fb.group({
    email: ['admin@admin.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  handleClearFormErrors(): void {
    if (this.error$()?.reason === 'UNAUTHORIZED_ERROR') {
      this._store.dispatch(onClearLoginError())
    }
  }

  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()

      return
    }

    const credentials: LoginCredentials = this.loginForm.value

    this._store.dispatch(onGetToken({ email: credentials.email, password: credentials.password }))
  }
}
