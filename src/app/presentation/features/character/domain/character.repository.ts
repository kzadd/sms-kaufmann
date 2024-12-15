import { Observable } from 'rxjs'

import { ApiResponse } from '@shared/types/http.types'
import { CharacterApiResponse } from '../application/character.types'

/**
 * Character repository.
 */
export interface CharacterRepository {
  getCharacters(): Observable<ApiResponse<CharacterApiResponse>>
}
