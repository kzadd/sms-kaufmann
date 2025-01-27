import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matAccountCircle, matLogout, matMenu } from '@ng-icons/material-icons/baseline'
import { jwtDecode } from 'jwt-decode'

import { FULL_ROUTE_PATHS, TOKEN_KEYS } from '@app/shared/constants/app.constant'
import { ResponsiveDirective } from '@app/shared/directives/responsive.directive'
import { JwtResponse } from '@app/shared/types/JWT.types'
import { deleteCookie, getCookie } from '@app/shared/utils/cookie.utils'

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
  styleUrl: './topbar.container.component.scss',
  templateUrl: './topbar.container.component.html',
  viewProviders: [provideIcons(TOPBAR_ICONS)]
})
export class TopbarContainerComponent implements OnInit {
  private _router = inject(Router)

  @Input() dropdownOpen = false
  @Output() toggleSidebar = new EventEmitter<void>()

  profileName = '...'

  ngOnInit(): void {
    const jwt = jwtDecode<JwtResponse>(getCookie(TOKEN_KEYS.accessToken) ?? '')
    const user = JSON.parse(jwt.User)
    const firstName = user.FirstName.trim()
    const lastName = user.LastName.trim()

    this.profileName = `${firstName} ${lastName}`.toUpperCase()
  }

  handleLogout(): void {
    deleteCookie(TOKEN_KEYS.accessToken)
    this._router.navigate([FULL_ROUTE_PATHS.auth.login])
  }

  handleProfileHover(isHovered: boolean): void {
    this.dropdownOpen = isHovered
  }

  handleToggleSidebar(): void {
    this.toggleSidebar.emit()
  }
}
