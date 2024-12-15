import { Routes } from '@angular/router'

import { publicRoutes } from './shared/constants/public-routes.constant'

const CharactersPage = () => import('./presentation/pages/character-page.component').then(m => m.CharacterPageComponent)
const NotFoundPage = () => import('./presentation/pages/not-found-page.component').then(m => m.NotFoundPageComponent)

/**
 * Routes configuration.
 * This defines the routes and their associated components.
 */
export const routes: Routes = [
  {
    path: publicRoutes.root,
    pathMatch: 'full',
    redirectTo: publicRoutes.characters
  },
  {
    loadComponent: CharactersPage,
    path: publicRoutes.characters
  },
  {
    loadComponent: NotFoundPage,
    path: publicRoutes.notFound
  }
]
