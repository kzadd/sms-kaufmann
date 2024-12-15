/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser'

import { initializeMockServiceWorker } from './app/__mocks__/initialize'
import { AppComponent } from './app/app.component'
import { appConfig } from './app/app.config'

/**
 * Initializes the mock service worker and render the angular application.
 */
initializeMockServiceWorker().then(() => bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err)))
