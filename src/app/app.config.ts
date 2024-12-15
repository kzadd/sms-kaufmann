import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { routes } from './app.routes'
import { storeLogger } from './core/middlewares/store-logger.middleware'
import { effects } from './core/state/effects.config'
import { reducer } from './core/state/reducer.config'
import { ENVIRONMENT } from './shared/configs/environment.config'

/**
 * Application configuration.
 * This defines the core services and configurations needed to initialize the app.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideEffects(effects),
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(reducer, { metaReducers: [storeLogger] }),
    provideStoreDevtools({ connectInZone: true, logOnly: ENVIRONMENT !== 'prod', maxAge: 25 })
  ]
}
