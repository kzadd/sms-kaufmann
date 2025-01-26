import { ROUTE_PATHS } from './routes.constant'

export const DEFAULT_CREDENTIALS = {
  password: '123456',
  username: 'kzadd'
}

export const FULL_ROUTE_PATHS = {
  auth: {
    login: `/${ROUTE_PATHS.auth}/${ROUTE_PATHS.login}`
  },
  dashboard: {
    root: `/${ROUTE_PATHS.dashboard}`
  },
  pushSend: {
    root: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.pushSend}`
  },
  smsSend: {
    root: `/${ROUTE_PATHS.dashboard}/${ROUTE_PATHS.smsSend}`
  }
}

export const TOKEN_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token'
}

export const TOKENS = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
}
