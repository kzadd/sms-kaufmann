import { HttpErrorResponse } from '@angular/common/http'

import { AppError, ErrorOptions, ErrorResponse } from '../types/exception.types'

/**
 * Creates a standardized error object with consistent structure.
 */
export const createError = ({ code, originalError, reason }: ErrorOptions): ErrorResponse => {
  const isNetworkError = originalError instanceof HttpErrorResponse
  const errorCode: number | null = code ?? (isNetworkError ? (originalError.status ?? null) : null)
  const errorReason: string | null = reason ?? (isNetworkError ? originalError.message : null)

  return {
    code: errorCode,
    originalError: originalError ?? null,
    reason: errorReason,

    toJSON(): string {
      return JSON.stringify(this.toObject())
    },

    toObject(): AppError {
      return {
        code: this.code,
        originalError: this.originalError,
        reason: this.reason
      }
    }
  }
}
