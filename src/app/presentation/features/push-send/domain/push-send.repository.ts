import { Observable } from 'rxjs'

import { ApiResponse } from '@shared/types/http.types'
import { PushSendApiResponse } from '../application/push-send.types'
import { PushSend } from './push-send.entity'

/**
 * Push send repository.
 */
export interface PushSendRepository {
  postPushSend(push: PushSend): Observable<ApiResponse<PushSendApiResponse>>
}
