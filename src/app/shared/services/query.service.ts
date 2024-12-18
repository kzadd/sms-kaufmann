import { inject, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private _route = inject(ActivatedRoute)

  /**
   * Retrieve the query parameters from the current URL.
   */
  getQuery() {
    const queryParams: Record<string, string> = {}

    this._route.snapshot.queryParamMap.keys.forEach(key => {
      queryParams[key] = this._route.snapshot.queryParamMap.get(key) ?? ''
    })

    return queryParams
  }
}
