import { Routes } from '@angular/router'

import { routePaths } from './shared/constants/routes.constant'

const BrandLayout = () =>
  import('./presentation/layouts/brand/brand-layout.component').then(m => m.BrandLayoutComponent)

const LoginPage = () => import('./presentation/pages/login-page.component').then(m => m.LoginPageComponent)
const NotFoundPage = () => import('./presentation/pages/not-found-page.component').then(m => m.NotFoundPageComponent)
const PushSendPage = () => import('./presentation/pages/push-send-page.component').then(m => m.PushSendPageComponent)
const SmsSendPage = () => import('./presentation/pages/sms-send-page.component').then(m => m.SmsSendPageComponent)

/**
 * Routes configuration.
 * This defines the routes and their associated components.
 */
export const routes: Routes = [
  {
    path: routePaths.root,
    pathMatch: 'full',
    redirectTo: `${routePaths.dashboard}/${routePaths.smsSend}`
  },
  {
    children: [
      {
        path: routePaths.root,
        pathMatch: 'full',
        redirectTo: routePaths.login
      },
      {
        loadComponent: LoginPage,
        path: routePaths.login
      }
    ],
    path: routePaths.auth
  },
  {
    children: [
      {
        path: routePaths.root,
        pathMatch: 'full',
        redirectTo: routePaths.smsSend
      },
      {
        loadComponent: SmsSendPage,
        path: routePaths.smsSend
      },
      {
        loadComponent: PushSendPage,
        path: routePaths.pushSend
      }
    ],
    loadComponent: BrandLayout,
    path: routePaths.dashboard
  },
  {
    loadComponent: NotFoundPage,
    path: routePaths.notFound
  }
]
