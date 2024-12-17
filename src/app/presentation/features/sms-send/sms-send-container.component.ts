import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Sms send container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sms-send-container',
  standalone: true,
  styleUrl: './sms-send-container.component.scss',
  templateUrl: './sms-send-container.component.html'
})
export class SmsSendContainerComponent {}
