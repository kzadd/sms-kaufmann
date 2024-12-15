export interface BaseError {
  code: number | null
  originalError: Error
  reason: string
}

export interface CreateErrorOptions {
  code?: number | null
  originalError?: unknown
  reason?: string | null
}

export interface CreateErrorResponse extends BaseError {
  toJSON: () => string
  toObject: () => BaseError
}
