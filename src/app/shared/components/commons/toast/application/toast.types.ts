export interface Toast {
  delay?: number
  message: string
  severity?: 'default' | 'error' | 'success'
}
