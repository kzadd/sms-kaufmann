import { bootstrapApplication } from '@angular/platform-browser'

import { initializeMockServiceWorker } from './app/__mocks__/initialize'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

/**
 * Initializes mock API service if is enabled.
 */
initializeMockServiceWorker()

/**
 * Main entry point of the application.
 */
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err))
