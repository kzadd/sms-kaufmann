import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { API_BASE_URL } from '@shared/configs/environment.config'
import { HttpService } from '@shared/services/http.service'
import { ApiResponse } from '@shared/types/http.types'
import { LoginApiResponse } from '../application/login.types'
import { LoginCredentials } from '../domain/login.entity'
import { LoginRepository } from '../domain/login.repository'

/**
 * Repository implementation that handles fetching login data from an external API.
 * It retrieves raw data and converts it into domain entities using an adapter.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiLoginRepository implements LoginRepository {
  private _http = inject(HttpService)

  getToken(credentials: LoginCredentials): Observable<ApiResponse<LoginApiResponse>> {
    const body = { ...credentials }

    return this._http.postJsonRequest(`${API_BASE_URL}/login`, { body })
  }
}
