import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

import { routePaths } from '@shared/constants/routes.constant'
import { getCookie } from '@shared/utils/cookie.utils'

export const authGuard: CanActivateFn = () => {
  const access_token = getCookie('access_token')
  const isAuthenticated = !!access_token
  const router = inject(Router)

  if (!isAuthenticated) {
    router.navigate([`/${routePaths.auth}/${routePaths.login}`])

    return false
  }

  return true
}
