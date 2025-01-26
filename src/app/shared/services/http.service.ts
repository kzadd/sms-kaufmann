import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { HttpMethod, NetworkResponse, RequestHeadersOptions, RequestOptions } from '../types/http.types'
import { getCookie } from '../utils/cookie.utils'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)

  /**
   * Creates and configures HTTP headers.
   */
  private _createHeaders({
    contentType = 'application/json',
    customHeaders = {},
    isPublic = false,
    token
  }: RequestHeadersOptions): HttpHeaders {
    let headers = new HttpHeaders(customHeaders)

    if (contentType) {
      headers = headers.set('Content-Type', contentType)
    }

    if (!isPublic) {
      const accessToken = token ?? getCookie('access_token') ?? ''

      if (accessToken) {
        headers = headers.set('Authorization', `Bearer ${accessToken}`)
      }
    }

    return headers
  }

  /**
   * Makes an HTTP request to the specified endpoint and transforms the response.
   */
  private _createRequest<T>({ data, headers, method, url }: RequestOptions): Observable<NetworkResponse<T>> {
    return this._http.request<T>(method, url, { body: data, headers }).pipe(
      map(response => ({ data: response })),
      catchError((error: HttpErrorResponse) => this._generateError(url, error))
    )
  }

  /**
   * Creates and configures HTTP requests with proper headers and body formatting.
   * Acts as a central factory for all HTTP methods.
   */
  private _factoryRequest<T>(
    method: HttpMethod,
    options: RequestHeadersOptions = {},
    url: string
  ): Observable<NetworkResponse<T>> {
    const { body, ...restOptions } = options

    const headers = this._createHeaders(restOptions)
    const data = body ? JSON.stringify(body) : undefined

    return this._createRequest<T>({ data, headers, method, url })
  }

  /**
   * Logs HTTP errors and returns an error Observable for error handling.
   */
  private _generateError(url: string, error: HttpErrorResponse): Observable<never> {
    console.error(`Request to ${url} failed`, error)

    return throwError(() => error)
  }

  /**
   * Creates and configures HTTP requests with proper headers and body formatting.
   * Acts as a central factory for all HTTP methods.
   */
  request<T>(method: HttpMethod, url: string, options?: RequestHeadersOptions): Observable<NetworkResponse<T>> {
    return this._factoryRequest<T>(method, options, url)
  }

  /**
   * Provides HTTP methods (DELETE, GET, PATCH, POST, PUT) for making API requests.
   * Each method uses the factory to ensure consistent request handling.
   */
  delete<T>(url: string, options?: RequestHeadersOptions): Observable<NetworkResponse<T>> {
    return this.request<T>('DELETE', url, options)
  }

  get<T>(url: string, options?: RequestHeadersOptions): Observable<NetworkResponse<T>> {
    return this.request<T>('GET', url, options)
  }

  patch<T>(url: string, options?: RequestHeadersOptions): Observable<NetworkResponse<T>> {
    return this.request<T>('PATCH', url, options)
  }

  post<T>(url: string, options?: RequestHeadersOptions): Observable<NetworkResponse<T>> {
    return this.request<T>('POST', url, options)
  }

  put<T>(url: string, options?: RequestHeadersOptions): Observable<NetworkResponse<T>> {
    return this.request<T>('PUT', url, options)
  }
}
