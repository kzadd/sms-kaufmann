import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matError, matLogin, matVisibility, matVisibilityOff } from '@ng-icons/material-icons/baseline'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'
import { getFormControlErrorMessage } from '@app/shared/utils/form-error.utils'
import { isRequired } from '@app/shared/utils/validators.utils'
import { loginActions } from '../../application/login.actions'
import { loginFeature } from '../../application/login.feature'
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
  private _store = inject(Store)

  error = toSignal(this._store.select(loginFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(loginFeature.selectLoading), { initialValue: false })

  form: FormGroup = this._formBuilder.group<LoginAuthForm>({
    password: this._formBuilder.control('', [isRequired]),
    username: this._formBuilder.control('', [isRequired])
  })

  showPassword = false

  ngOnInit(): void {
    this._store.select(loginFeature.selectLoading).subscribe(loading => {
      if (!loading) {
        this.form.enable()
      }
    })
  }

  getErrorMessage(controlName: LoginAuthKey): string {
    const control = this.form.get(controlName)

    if (!control) return ''

    return getFormControlErrorMessage(control)
  }

  handleClearForm(): void {
    this.form.reset()
  }

  handleSignIn(): void {
    const { password, username } = this.form.getRawValue()

    if (this.form.valid) {
      this.form.disable()
      this._store.dispatch(loginActions.signIn({ login: { password, username } }))

      this._store
        .select(loginFeature.selectLoginState)
        .pipe(take(2))
        .subscribe(state => {
          if (!state.loading && !state.error) {
            this.handleClearForm()
            this._router.navigate([ROUTE_PATHS.dashboard])
          }
        })
    } else {
      this.form.markAllAsTouched()
    }
  }

  handleTogglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }
}
