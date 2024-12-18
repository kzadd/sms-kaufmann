import { Observable } from 'rxjs'

import { ApiResponse } from '@shared/types/http.types'
import { SmsSendApiResponse } from '../application/sms-send.types'
import { SmsSend } from './sms-send.entity'

/**
 * Sms send repository.
 */
export interface SmsSendRepository {
  postSmsSend(sms: SmsSend): Observable<ApiResponse<SmsSendApiResponse>>
}
