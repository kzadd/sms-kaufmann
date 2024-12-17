import { Observable } from 'rxjs'

import { ApiResponse } from '@shared/types/http.types'
import { LoginApiResponse } from '../application/login.types'
import { LoginCredentials } from './login.entity'

/**
 * Login repository.
 */
export interface LoginRepository {
  getToken(credentials: LoginCredentials): Observable<ApiResponse<LoginApiResponse>>
}
