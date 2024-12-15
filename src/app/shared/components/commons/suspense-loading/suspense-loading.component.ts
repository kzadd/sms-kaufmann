import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * SuspenseLoading component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-suspense-loading',
  standalone: true,
  template: `<p>Loading...</p>`
})
export class SuspenseLoadingComponent {}
