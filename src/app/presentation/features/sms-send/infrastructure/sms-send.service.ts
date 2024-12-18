import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { API_BASE_URL } from '@shared/configs/environment.config'
import { HttpService } from '@shared/services/http.service'
import { ApiResponse } from '@shared/types/http.types'
import { SmsSendApiResponse } from '../application/sms-send.types'
import { isSmsSendIndividual, isSmsSendMassive, SmsSend } from '../domain/sms-send.entity'
import { SmsSendRepository } from '../domain/sms-send.repository'

/**
 * Repository implementation that handles fetching sms send data from an external API.
 * It retrieves raw data and converts it into domain entities using an adapter.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiSmsSendRepository implements SmsSendRepository {
  private _http = inject(HttpService)

  postSmsSend(sms: SmsSend): Observable<ApiResponse<SmsSendApiResponse>> {
    const body = {
      ...(isSmsSendIndividual(sms) && { id: sms.id, message: sms.message, phone: sms.phone }),
      ...(isSmsSendMassive(sms) && { file: sms.file, id: sms.id })
    }

    return this._http.postJsonRequest(`${API_BASE_URL}/sms-send`, { body })
  }
}
