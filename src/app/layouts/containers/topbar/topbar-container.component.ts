import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matAccountCircle, matLogout, matMenu } from '@ng-icons/material-icons/baseline'

import { DEFAULT_CREDENTIALS, FULL_ROUTE_PATHS, TOKEN_KEYS } from '@app/shared/constants/app.constant'
import { ResponsiveDirective } from '@app/shared/directives/responsive.directive'
import { deleteCookie } from '@app/shared/utils/cookie.utils'

const TOPBAR_ICONS = {
  logoutIcon: matLogout,
  menuIcon: matMenu,
  userAccountIcon: matAccountCircle
}

/**
 * Topbar container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, ResponsiveDirective, RouterLink],
  selector: 'app-topbar-container',
  styleUrl: './topbar-container.component.scss',
  templateUrl: './topbar-container.component.html',
  viewProviders: [provideIcons(TOPBAR_ICONS)]
})
export class TopbarContainerComponent {
  private _router = inject(Router)

  @Input() dropdownOpen = false
  @Output() toggleSidebar = new EventEmitter<void>()

  profileName: string = DEFAULT_CREDENTIALS.username

  handleLogout(): void {
    deleteCookie(TOKEN_KEYS.accessToken)
    deleteCookie(TOKEN_KEYS.refreshToken)
    this._router.navigate([FULL_ROUTE_PATHS.auth.login])
  }

  handleProfileHover(isHovered: boolean): void {
    this.dropdownOpen = isHovered
  }

  handleToggleSidebar(): void {
    this.toggleSidebar.emit()
  }
}
