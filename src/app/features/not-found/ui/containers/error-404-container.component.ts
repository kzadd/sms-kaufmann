import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { matHome } from '@ng-icons/material-icons/baseline'

import { ROUTE_PATHS } from '@app/shared/constants/routes.constant'

const ERROR_404_ICONS = {
  homeIcon: matHome
}

/**
 * Error 404 container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  selector: 'app-error-404-container',
  styleUrl: './error-404-container.component.scss',
  templateUrl: './error-404-container.component.html',
  viewProviders: [provideIcons(ERROR_404_ICONS)]
})
export class Error404ContainerComponent {
  private _router = inject(Router)

  handleGoHome() {
    this._router.navigate([ROUTE_PATHS.root])
  }
}
