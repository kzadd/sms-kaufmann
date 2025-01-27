import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

import { PushSendIndividualContainerComponent } from './ui/containers/push-send-individual/push-send-individual.container.component'
import { PushSendMassiveContainerComponent } from './ui/containers/push-send-massive/push-send-massive.container.component'

/**
 * Push send page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbNavModule, PushSendIndividualContainerComponent, PushSendMassiveContainerComponent],
  selector: 'app-push-send-page',
  styleUrl: './push-send.page.component.scss',
  templateUrl: './push-send.page.component.html'
})
export class PushSendPageComponent {
  activeTab = 'individual'
}
