import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap'

import { routePaths } from '@shared/constants/routes.constant'
import { deleteCookie } from '@shared/utils/cookie.utils'

/**
 * Header container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, RouterLink],
  selector: 'app-header-container',
  standalone: true,
  styleUrl: './header-container.component.scss',
  templateUrl: './header-container.component.html'
})
export class HeaderContainerComponent {
  private _router = inject(Router)

  profileName = 'Ricardo Carrasquero'

  handleLogout() {
    deleteCookie('access_token')
    this._router.navigate([`/${routePaths.auth}/${routePaths.login}`])
  }
}
