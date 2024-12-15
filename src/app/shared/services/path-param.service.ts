import { inject, Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class PathParamService {
  private _route = inject(ActivatedRoute)

  /**
   * Retrieve a specific path parameter from the URL.
   */
  getPathParam(key: string): string {
    return this._route.snapshot.paramMap.get(key) ?? ''
  }
}
