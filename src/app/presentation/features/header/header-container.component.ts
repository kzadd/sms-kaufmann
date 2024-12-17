import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap'

/**
 * The Header container.
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
  profileName = 'Ricardo Carrasquero'

  handleLogout() {
    console.log('Cerrando sesión...')
  }
}
