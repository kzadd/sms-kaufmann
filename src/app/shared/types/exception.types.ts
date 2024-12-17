import { HttpErrorResponse } from '@angular/common/http'

export interface BaseError {
  code: number | null
  originalError: HttpErrorResponse | null
  reason: string | null
}

export interface CreateErrorOptions {
  code?: number | null
  originalError?: HttpErrorResponse | null
  reason?: string | null
}

export interface CreateErrorResponse extends BaseError {
  toJSON: () => string
  toObject: () => BaseError
}
