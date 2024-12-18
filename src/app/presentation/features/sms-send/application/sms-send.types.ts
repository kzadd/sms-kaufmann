import { BaseError } from '@shared/types/exception.types'

export interface SmsSendApiResponse {
  status: string
}

export interface SmsSendError {
  error: BaseError
}

export interface SmsSendState {
  error: BaseError | null
  loading: boolean
  success: boolean
}
