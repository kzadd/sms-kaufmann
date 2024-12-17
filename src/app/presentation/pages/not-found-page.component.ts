import { ChangeDetectionStrategy, Component } from '@angular/core'

import { NotFoundContainer } from '@presentation/features/not-found'

/**
 * NotFound page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NotFoundContainer],
  selector: 'app-not-found-page',
  standalone: true,
  template: `<app-not-found-container />`
})
export class NotFoundPageComponent {}
