import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'

import { smsSendFeature } from './application/sms-send.feature'
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
  private _store = inject(Store)

  loading = toSignal(this._store.select(smsSendFeature.selectLoading), { initialValue: false })

  activeTab = 'individual'
}
