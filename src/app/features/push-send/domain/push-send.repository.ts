import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { PushSendIndividual, PushSendMassive } from './push-send.entity'

/**
 * Repository interface that defines the contract for accessing push send data.
 */
export interface PushSendRepository {
  sendPushIndividual(pushSend: PushSendIndividual): Observable<ApiResponse>
  sendPushMassive(pushSend: PushSendMassive): Observable<ApiResponse>
}
