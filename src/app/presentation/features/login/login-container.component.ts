import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * The Login container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-container',
  standalone: true,
  styleUrl: './login-container.component.scss',
  templateUrl: './login-container.component.html'
})
export class LoginContainerComponent {}
