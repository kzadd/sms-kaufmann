interface StorageBase {
  isBase64?: boolean
  isJSON?: boolean
}

export interface CookieOptions extends StorageBase {
  domain?: string
  expires?: number
  path?: string
  secure?: boolean
}

export interface LocalStorageOptions extends StorageBase {}
