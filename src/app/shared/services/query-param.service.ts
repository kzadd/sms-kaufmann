import { inject, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {
  private _route = inject(ActivatedRoute)

  /**
   * Retrieve a specific query parameter from the URL.
   */
  getQueryParam(key: string) {
    return this._route.snapshot.queryParamMap.get(key) ?? ''
  }
}
