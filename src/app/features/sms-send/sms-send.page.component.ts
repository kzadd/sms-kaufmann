import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Sms send page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-sms-send-page',
  styleUrl: './sms-send.page.component.scss',
  templateUrl: './sms-send.page.component.html'
})
export class SmsSendPageComponent {}
