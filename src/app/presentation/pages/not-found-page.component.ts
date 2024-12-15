import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * NotFound page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-not-found-page',
  standalone: true,
  template: `<h1>Not Found page</h1>`
})
export class NotFoundPageComponent {}
