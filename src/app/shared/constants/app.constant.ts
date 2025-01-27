import { ROUTE_PATHS } from './routes.constant'

export const FULL_ROUTE_PATHS = {
  auth: {
    login: `/${ROUTE_PATHS.auth}/${ROUTE_PATHS.login}`
  },
  dashboard: {
    pushSend: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.pushSend}`,
    root: `/${ROUTE_PATHS.dashboard}`,
    smsSend: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.smsSend}`
  }
}

export const TOKEN_KEYS = {
  accessToken: 'access_token'
}
