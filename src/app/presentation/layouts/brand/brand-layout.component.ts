import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { HeaderContainer } from '@presentation/features/header'
import { NavigationContainer } from '@presentation/features/navigation'

/**
 * Brand layout.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderContainer, NavigationContainer, RouterOutlet],
  selector: 'app-brand-layout',
  standalone: true,
  styleUrl: './brand-layout.component.scss',
  templateUrl: './brand-layout.component.html'
})
export class BrandLayoutComponent {}
