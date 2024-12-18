import { BaseError } from '@shared/types/exception.types'

export interface PushSendApiResponse {
  status: string
}

export interface PushSendError {
  error: BaseError
}

export interface PushSendState {
  error: BaseError | null
  loading: boolean
  success: boolean
}
