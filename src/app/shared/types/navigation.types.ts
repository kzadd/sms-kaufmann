import { ROUTE_PATHS } from '../constants/routes.constant'

export interface NavigationItem {
  icon?: string
  label: string
  namePath: string
  path: string
}

export type RouteKey = keyof typeof ROUTE_PATHS
