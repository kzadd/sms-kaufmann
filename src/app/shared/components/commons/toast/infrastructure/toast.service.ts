import { Injectable, signal } from '@angular/core'

import { Toast } from '../application/toast.types'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast = signal<Toast[]>([])

  /**
   * Show a toast.
   */
  show(toast: Toast) {
    const newToast = { ...toast, severity: toast.severity || 'default' }

    this.toast.update(toasts => [...toasts, newToast])
  }

  /**
   * Remove a toast.
   */
  remove(toast: Toast) {
    this.toast.update(toasts => toasts.filter(item => item !== toast))
  }
}
