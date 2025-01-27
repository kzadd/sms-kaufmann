import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'

import { pushSendFeature } from './application/push-send.feature'
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
  private _store = inject(Store)

  loading = toSignal(this._store.select(pushSendFeature.selectLoading), { initialValue: false })

  activeTab = 'individual'
}
