import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { ToastComponent } from '@shared/components/commons/toast/toast.component'

/**
 * Main application component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ToastComponent],
  selector: 'app-root',
  standalone: true,
  template: `
    <app-toast />
    <router-outlet />
  `
})
export class AppComponent {}
