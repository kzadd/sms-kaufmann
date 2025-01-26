import { HttpHeaders } from '@angular/common/http'

export interface ApiResponse<T> extends NetworkResponse<ServiceResponse<T>> {}
export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

export interface NetworkResponse<T> {
  data: T
}

export interface RequestHeadersOptions {
  body?: Record<string, unknown>
  contentType?: string
  customHeaders?: Record<string, string>
  isPublic?: boolean
  token?: string
}

export interface RequestOptions {
  data?: string
  headers: HttpHeaders
  method: HttpMethod
  url: string
}

/**
 * Service response type, this change according to the service response
 * @param T - The type of the response data
 * @returns The response data
 */
export type ServiceResponse<T> = T
