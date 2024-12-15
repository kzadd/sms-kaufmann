import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { API_BASE_URL } from '@shared/configs/environment.config'
import { HttpService } from '@shared/services/http.service'
import { ApiResponse } from '@shared/types/http.types'
import { CharacterApiResponse } from '../application/character.types'
import { CharacterRepository } from '../domain/character.repository'

/**
 * Repository implementation that handles fetching character data from an external API.
 * It retrieves raw data and converts it into domain entities using an adapter.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiCharacterRepository implements CharacterRepository {
  private _http = inject(HttpService)

  getCharacters(): Observable<ApiResponse<CharacterApiResponse>> {
    return this._http.getJsonRequest(`${API_BASE_URL}/character`, { isPublic: true })
  }
}
