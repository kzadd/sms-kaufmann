import { Observable } from 'rxjs'

import { ApiResponse } from '@app/shared/types/http.types'
import { LoginApiResponse, LoginAuth } from './login.entity'

/**
 * Repository interface that defines the contract for accessing login data.
 */
export interface LoginRepository {
  signIn(login: LoginAuth): Observable<ApiResponse<LoginApiResponse>>
}
