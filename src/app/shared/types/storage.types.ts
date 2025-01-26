interface StorageBaseOptions {
  isBase64?: boolean
  isJSON?: boolean
}

export interface CookieOptions extends StorageBaseOptions {
  domain?: string
  expires?: number
  path?: string
  secure?: boolean
}

export interface LocalStorageOptions extends StorageBaseOptions {}
