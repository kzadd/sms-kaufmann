import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * Push send page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-push-send-page',
  styleUrl: './push-send.page.component.scss',
  templateUrl: './push-send.page.component.html'
})
export class PushSendPageComponent {}
