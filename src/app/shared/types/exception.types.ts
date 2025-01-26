import { HttpErrorResponse } from '@angular/common/http'

export interface AppError {
  code: number | null
  originalError: Error | HttpErrorResponse | null
  reason: string | null
}

export interface ErrorOptions {
  code?: number | null
  originalError?: Error | HttpErrorResponse | null
  reason?: string | null
}

export interface ErrorResponse extends AppError {
  toJSON: () => string
  toObject: () => AppError
}
