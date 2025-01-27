import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { SmsSendIndividual, SmsSendMassive } from '../domain/sms-send.entity'
import { SmsSendRepository } from '../domain/sms-send.repository'

/**
 * Repository implementation that handles sending sms data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiSmsSendRepository implements SmsSendRepository {
  private _http = inject(HttpService)

  sendSmsIndividual(smsSend: SmsSendIndividual): Observable<ApiResponse> {
    const body = {
      fono: smsSend.phone,
      mensaje: smsSend.message
    }

    return this._http.post(`${env.API_URL}/movistar/send-notification-movistar`, { body })
  }

  sendSmsMassive(smsSend: SmsSendMassive): Observable<ApiResponse> {
    const body = {
      ...smsSend
    }

    return this._http.post(`${env.API_URL}`, { body })
  }
}
