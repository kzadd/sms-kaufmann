import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * The PushSend container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-push-send-container',
  standalone: true,
  styleUrl: './push-send-container.component.scss',
  templateUrl: './push-send-container.component.html'
})
export class PushSendContainerComponent {}
