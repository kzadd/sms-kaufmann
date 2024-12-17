import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SmsSendContainer } from '@presentation/features/sms-send'

/**
 * Sms send page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SmsSendContainer],
  selector: 'app-sms-send-page',
  standalone: true,
  template: `<app-sms-send-container />`
})
export class SmsSendPageComponent {}
