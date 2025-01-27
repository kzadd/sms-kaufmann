import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'

import { smsSendActions } from './application/sms-send.actions'
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

  error = toSignal(this._store.select(smsSendFeature.selectError), { initialValue: null })
  loading = toSignal(this._store.select(smsSendFeature.selectLoading), { initialValue: false })

  activeTab = 'individual'

  handleChangeTab(): void {
    if (this.error()) {
      this._store.dispatch(smsSendActions.clearError())
    }
  }
}
