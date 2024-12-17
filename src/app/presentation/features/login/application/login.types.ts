import { BaseError } from '@shared/types/exception.types'

export interface LoginApiResponse {
  access_token: string
}

export interface LoginError {
  error: BaseError
}

export interface LoginState {
  error: BaseError | null
  loading: boolean
}
