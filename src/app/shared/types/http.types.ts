export interface ApiResponse<T = unknown> extends NetworkHttpResponse<ServiceResponse<T>> {}

export interface HttpHeadersOptions {
  body?: Record<string, unknown>
  contentType?: string
  customHeaders?: Record<string, string>
  isPublic?: boolean
  token?: string
}

export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export interface HttpRequestOptions {
  data?: string
  headers: Record<string, string>
  method: HttpMethod
  url: string
}

export interface NetworkHttpResponse<T> {
  data: T
}

export interface ServiceResponse<T = unknown> {
  errors: null | string[]
  payload: T
  success: string
}
