import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { HttpHeadersOptions, HttpMethod, HttpRequestOptions, NetworkHttpResponse } from '../types/http.types'
import { getCookie } from '../utils/cookie.utils'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)

  /**
   * Creates headers for HTTP requests.
   */
  private createHeaders({
    contentType = 'application/json',
    customHeaders = {},
    isPublic = false,
    token
  }: HttpHeadersOptions): Record<string, string> {
    const headers: Record<string, string> = { ...customHeaders }

    if (contentType) {
      headers['Content-Type'] = contentType
    }

    if (!isPublic) {
      const accessToken = token ?? getCookie('access_token') ?? ''

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
      }
    }

    return headers
  }

  /**
   * Creates a request to an API endpoint.
   */
  private createRequest<T>({ data, headers, method, url }: HttpRequestOptions): Observable<NetworkHttpResponse<T>> {
    return this._http.request<T>(method, url, { body: data, headers }).pipe(
      map(response => ({ data: response })),
      catchError(error => {
        console.error(`Request to ${url} failed`, error)
        return throwError(() => error)
      })
    )
  }

  /**
   * Factory function that creates a request to an API endpoint.
   */
  private factoryRequest<T>(method: HttpMethod, options: HttpHeadersOptions = {}, url: string) {
    const { body, ...restOptions } = options

    const headers = this.createHeaders(restOptions)
    const data = body && JSON.stringify(body)

    return this.createRequest<T>({ data, headers, method, url })
  }

  /**
   * Collection of HTTP request methods for making JSON API calls.
   * Each method handles a specific HTTP verb (DELETE, GET, PATCH, POST, PUT).
   */
  deleteJsonRequest<T>(url: string, options?: HttpHeadersOptions) {
    return this.factoryRequest<T>('DELETE', options, url)
  }

  getJsonRequest<T>(url: string, options?: HttpHeadersOptions) {
    return this.factoryRequest<T>('GET', options, url)
  }

  patchJsonRequest<T>(url: string, options?: HttpHeadersOptions) {
    return this.factoryRequest<T>('PATCH', options, url)
  }

  postJsonRequest<T>(url: string, options?: HttpHeadersOptions) {
    return this.factoryRequest<T>('POST', options, url)
  }

  putJsonRequest<T>(url: string, options?: HttpHeadersOptions) {
    return this.factoryRequest<T>('PUT', options, url)
  }
}
