import { ChangeDetectionStrategy, Component } from '@angular/core'

import { LoginAuthContainerComponent } from './ui/containers/login-auth-container.component'

/**
 * Login page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginAuthContainerComponent],
  selector: 'app-login-page',
  template: `<app-login-auth-container />`
})
export class LoginPageComponent {}
