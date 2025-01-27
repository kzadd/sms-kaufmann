import { Routes } from '@angular/router'

import { authGuard } from './core/guards/auth.guard'
import { FULL_ROUTE_PATHS } from './shared/constants/app.constant'
import { ROUTE_PATHS } from './shared/constants/routes.constant'

const BrandLayout = () => import('./layouts/brand.layout.component').then(m => m.BrandLayoutComponent)
const LoginPage = () => import('./features/login').then(m => m.LoginPage)
const NotFoundPage = () => import('./features/not-found').then(m => m.NotFoundPage)
const PushSendPage = () => import('./features/push-send').then(m => m.PushSendPage)
const SmsSendPage = () => import('./features/sms-send').then(m => m.SmsSendPage)

/**
 * Routes configuration.
 * This defines the routes and their associated components.
 */
export const routes: Routes = [
  {
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.login
      },
      {
        loadComponent: LoginPage,
        path: ROUTE_PATHS.login
      }
    ],
    path: ROUTE_PATHS.auth
  },
  {
    path: ROUTE_PATHS.root,
    pathMatch: 'full',
    redirectTo: FULL_ROUTE_PATHS.dashboard.smsSend
  },
  {
    canActivate: [authGuard],
    children: [
      {
        path: ROUTE_PATHS.root,
        pathMatch: 'full',
        redirectTo: ROUTE_PATHS.smsSend
      },
      {
        loadComponent: SmsSendPage,
        path: ROUTE_PATHS.smsSend
      },
      {
        loadComponent: PushSendPage,
        path: ROUTE_PATHS.pushSend
      }
    ],
    loadComponent: BrandLayout,
    path: ROUTE_PATHS.dashboard
  },
  {
    loadComponent: NotFoundPage,
    path: ROUTE_PATHS.notFound
  }
]
