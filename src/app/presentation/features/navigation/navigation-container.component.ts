import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'

import { routePaths } from '@shared/constants/routes.constant'

/**
 * The Navigation container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navigation-container',
  standalone: true,
  styleUrl: './navigation-container.component.scss',
  templateUrl: './navigation-container.component.html'
})
export class NavigationContainerComponent implements OnInit, OnDestroy {
  private _mediaQuery = window.matchMedia('(min-width: 768px)')
  private _onMediaQueryListener!: () => void

  isCollapsed = false

  menuItems = [
    {
      icon: 'bi-chat-left-fill',
      label: 'Envío SMS',
      path: routePaths.smsSend
    },
    {
      icon: 'bi-envelope-fill',
      label: 'Envío PUSH',
      path: routePaths.pushSend
    }
  ]

  ngOnInit(): void {
    this.handleUpdateCollapseState()
    this._onMediaQueryListener = () => this.handleUpdateCollapseState()
    this._mediaQuery.addEventListener('change', this._onMediaQueryListener)
  }

  ngOnDestroy(): void {
    this._mediaQuery.removeEventListener('change', this._onMediaQueryListener)
  }

  handleToggleMenu(): void {
    this.isCollapsed = !this.isCollapsed
  }

  private handleUpdateCollapseState(): void {
    this.isCollapsed = !this._mediaQuery.matches
  }
}