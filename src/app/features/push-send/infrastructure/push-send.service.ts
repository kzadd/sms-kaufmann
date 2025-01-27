import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { PushSendApplicationApiResponse, PushSendIndividual, PushSendMassive } from '../domain/push-send.entity'
import { PushSendRepository } from '../domain/push-send.repository'

/**
 * Repository implementation that handles sending push data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiPushSendRepository implements PushSendRepository {
  private _http = inject(HttpService)

  getApplications(): Observable<ApiResponse<PushSendApplicationApiResponse>> {
    return this._http.get(`${env.API_URL}/config-property`)
  }

  sendPushIndividual(pushSend: PushSendIndividual): Observable<ApiResponse> {
    const body = {
      app_id: pushSend.app,
      mensaje: pushSend.message
    }

    return this._http.post(`${env.API_URL}/one-signal/send-notification/${pushSend.dni}`, { body })
  }

  sendPushMassive(pushSend: PushSendMassive): Observable<ApiResponse> {
    const body = {
      ...pushSend
    }

    return this._http.post(`${env.API_URL}/movistar/send-notification-movistar`, { body })
  }
}
