import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

import { FULL_ROUTE_PATHS } from '@app/shared/constants/app.constant'
import { getCookie } from '@app/shared/utils/cookie.utils'

/**
 * Guard that checks if user is authenticated via access token.
 * Redirects to login page if not authenticated.
 */
export const authGuard: CanActivateFn = (): boolean => {
  const accessToken = getCookie('access_token')
  const router = inject(Router)

  if (!accessToken) {
    router.navigate([FULL_ROUTE_PATHS.auth.login])

    return false
  }

  return true
}
