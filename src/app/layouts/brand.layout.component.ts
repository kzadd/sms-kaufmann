import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { SidebarContainerComponent } from './containers/sidebar/sidebar.container.component'
import { TopbarContainerComponent } from './containers/topbar/topbar.container.component'

/**
 * Brand layout.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidebarContainerComponent, TopbarContainerComponent],
  selector: 'app-brand-layout',
  styleUrl: './brand.layout.component.scss',
  templateUrl: './brand.layout.component.html'
})
export class BrandLayoutComponent {
  overlaySidebar = false
  sidebarCollapsed = false

  handleCloseSidebar(): void {
    this.overlaySidebar = false
    this.sidebarCollapsed = false
  }

  handleToggleSidebar(): void {
    this.overlaySidebar = !this.overlaySidebar
    this.sidebarCollapsed = !this.sidebarCollapsed
  }
}
