import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Error404ContainerComponent } from './ui/containers/error-404-container.component'

/**
 * Not found page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Error404ContainerComponent],
  selector: 'app-not-found-page',
  template: `<app-error-404-container />`
})
export class NotFoundPageComponent {}
