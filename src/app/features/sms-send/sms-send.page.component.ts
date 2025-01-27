import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'

import { SmsSendIndividualContainerComponent } from './ui/containers/sms-send-individual/sms-send-individual.container.component'
import { SmsSendMassiveContainerComponent } from './ui/containers/sms-send-massive/sms-send-massive.container.component'

/**
 * Sms send page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbNavModule, SmsSendIndividualContainerComponent, SmsSendMassiveContainerComponent],
  selector: 'app-sms-send-page',
  styleUrl: './sms-send.page.component.scss',
  templateUrl: './sms-send.page.component.html'
})
export class SmsSendPageComponent {
  activeTab = 'individual'
}
