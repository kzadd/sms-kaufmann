import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Sms send individual container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-sms-send-individual-container',
  template: `<div>sms-send-individual</div>`
})
export class SmsSendIndividualContainerComponent {}
