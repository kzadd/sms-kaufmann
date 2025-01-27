import { inject, Injectable } from '@angular/core'
import { Twofish } from 'ng-twofish'
import { Observable } from 'rxjs'

import { env } from '@app/shared/configs/environment.config'
import { HttpService } from '@app/shared/services/http.service'
import { ApiResponse } from '@app/shared/types/http.types'
import { LoginApiResponse, LoginAuth } from '../domain/login.entity'
import { LoginRepository } from '../domain/login.repository'

/**
 * Repository implementation that handles login data from an external API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiLoginRepository implements LoginRepository {
  private _http = inject(HttpService)

  signIn(login: LoginAuth): Observable<ApiResponse<LoginApiResponse>> {
    const body = {
      GamWSLoginInSDT: {
        CustomParameters: {
          Items: [
            {
              Id: Twofish.encrypt64('Pais', env.HASH),
              Token: '',
              Value: Twofish.encrypt64('CL', env.HASH)
            },
            {
              Id: 'App',
              Token: '',
              Value: 'Mensajeria'
            },
            {
              Id: 'Version',
              Token: '',
              Value: '1'
            }
          ]
        },
        Login: Twofish.encrypt64(login.username, env.HASH),
        Password: Twofish.encrypt64(login.password, env.HASH)
      }
    }

    const customHeaders = {
      'Ocp-Apim-Subscription-Key': env.LOGIN_ID
    }

    return this._http.post(`${env.API_GAM_URL}/genexus/gam/v1/servicios/login`, { body, customHeaders })
  }
}
