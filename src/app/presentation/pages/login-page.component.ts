import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LoginContainer } from '@presentation/features/login'

/**
 * Login page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginContainer],
  selector: 'app-login-page',
  standalone: true,
  template: `<app-login-container />`
})
export class LoginPageComponent {}
