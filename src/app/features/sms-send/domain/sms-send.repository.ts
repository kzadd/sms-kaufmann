import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { SmsSendIndividual, SmsSendMassive } from './sms-send.entity'

/**
 * Repository interface that defines the contract for accessing sms send data.
 */
export interface SmsSendRepository {
  sendSmsIndividual(smsSend: SmsSendIndividual): Observable<ApiResponse>
  sendSmsMassive(smsSend: SmsSendMassive): Observable<ApiResponse>
}
