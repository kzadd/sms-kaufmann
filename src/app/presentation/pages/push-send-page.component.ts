import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PushSendContainer } from '@presentation/features/push-send'

/**
 * Push send page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PushSendContainer],
  selector: 'app-push-send-page',
  standalone: true,
  template: `<app-push-send-container />`
})
export class PushSendPageComponent {}
