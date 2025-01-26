import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matError, matLogin, matVisibility, matVisibilityOff } from '@ng-icons/material-icons/baseline'

import { DEFAULT_CREDENTIALS, TOKEN_KEYS, TOKENS } from '@app/shared/constants/app.constant'
import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'
import { putCookie } from '@app/shared/utils/cookie.utils'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isRequired } from '@app/shared/utils/validators.utils'
import { LoginAuthForm, LoginAuthKey } from '../../domain/login.entity'

const LOGIN_ICONS = {
  errorIcon: matError,
  hidePasswordIcon: matVisibilityOff,
  loginIcon: matLogin,
  showPasswordIcon: matVisibility
}

/**
 * Login auth container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ReactiveFormsModule],
  selector: 'app-login-auth-container',
  styleUrl: './login-auth-container.component.scss',
  templateUrl: './login-auth-container.component.html',
  viewProviders: [provideIcons(LOGIN_ICONS)]
})
export class LoginAuthContainerComponent implements OnInit {
  private _formBuilder = inject(NonNullableFormBuilder)
  private _router = inject(Router)

  errorMessage = false

  form: FormGroup<LoginAuthForm> = this._formBuilder.group({
    password: this._formBuilder.control(DEFAULT_CREDENTIALS.password, [isRequired]),
    username: this._formBuilder.control(DEFAULT_CREDENTIALS.username, [isRequired])
  })

  showPassword = false

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => (this.errorMessage = false))
  }

  getErrorMessage(controlName: LoginAuthKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleSignIn(): void {
    const { password, username } = this.form.getRawValue()

    const isDefaultCredentials = password === DEFAULT_CREDENTIALS.password && username === DEFAULT_CREDENTIALS.username

    if (isDefaultCredentials && this.form.valid) {
      putCookie(TOKEN_KEYS.accessToken, TOKENS.accessToken)
      putCookie(TOKEN_KEYS.refreshToken, TOKENS.refreshToken)
      this._router.navigate([ROUTE_PATHS.dashboard])
    } else {
      this.errorMessage = true
      this.form.markAllAsTouched()
    }
  }

  handleTogglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }
}
