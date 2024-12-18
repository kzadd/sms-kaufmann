import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { API_BASE_URL } from '@shared/configs/environment.config'
import { HttpService } from '@shared/services/http.service'
import { ApiResponse } from '@shared/types/http.types'
import { PushSendApiResponse } from '../application/push-send.types'
import { isPushSendIndividual, isPushSendMassive, PushSend } from '../domain/push-send.entity'
import { PushSendRepository } from '../domain/push-send.repository'

/**
 * Repository implementation that handles fetching push send data from an external API.
 * It retrieves raw data and converts it into domain entities using an adapter.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiPushSendRepository implements PushSendRepository {
  private _http = inject(HttpService)

  postPushSend(push: PushSend): Observable<ApiResponse<PushSendApiResponse>> {
    const body = {
      ...(isPushSendIndividual(push) && {
        application: push.application,
        dni: push.dni,
        id: push.id,
        message: push.message
      }),
      ...(isPushSendMassive(push) && { application: push.application, file: push.file, id: push.id })
    }

    return this._http.postJsonRequest(`${API_BASE_URL}/push-send`, { body })
  }
}
