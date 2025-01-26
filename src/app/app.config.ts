import { provideHttpClient, withFetch } from '@angular/common/http'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter, withComponentInputBinding } from '@angular/router'
import { provideNgIconsConfig } from '@ng-icons/core'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideToastr } from 'ngx-toastr'

import { routes } from './app.routes'
import { storeLogger } from './core/middlewares/store-logger.middleware'
import { effects } from './core/state/effects.config'
import { reducer } from './core/state/reducer.config'
import { env } from './shared/configs/environment.config'

/**
 * Application configuration module.
 * This module defines the core services and configurations needed to bootstrap the application
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideEffects(effects),
    provideHttpClient(withFetch()),
    provideNgIconsConfig({
      size: '1.125rem'
    }),
    provideRouter(routes, withComponentInputBinding()),
    provideStore(reducer, {
      metaReducers: [storeLogger]
    }),
    provideStoreDevtools({
      connectInZone: true,
      logOnly: env.MODE !== 'production',
      maxAge: 25
    }),
    provideToastr(),
    provideZoneChangeDetection({
      eventCoalescing: true
    })
  ]
}
