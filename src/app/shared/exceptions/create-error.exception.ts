import { HttpErrorResponse } from '@angular/common/http'

import { BaseError, CreateErrorOptions, CreateErrorResponse } from '../types/exception.types'

/**
 * Factory function that creates a standardized error.
 * This function helps to create an error with a consistent structure, which can be serialized and converted.
 */
export const createError = (options: CreateErrorOptions): CreateErrorResponse => {
  const { code, originalError, reason } = options

  const isNetworkError = originalError instanceof HttpErrorResponse

  const errorCode = code ?? (isNetworkError ? (originalError.status ?? null) : null)
  const errorInstance = originalError ?? null
  const errorReason = reason ?? (isNetworkError ? originalError.message : null)

  return {
    code: errorCode,
    originalError: errorInstance,
    reason: errorReason,

    toJSON(): string {
      return JSON.stringify(this.toObject())
    },

    toObject(): BaseError {
      return {
        code: this.code,
        originalError: this.originalError,
        reason: this.reason
      }
    }
  }
}
