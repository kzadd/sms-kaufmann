import { Injectable, signal } from '@angular/core'

import { Toast } from '../domain/toast.entity'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast$ = signal<Toast[]>([])

  /**
   * Remove a toast.
   */
  remove(toast: Toast) {
    this.toast$.update(toasts => toasts.filter(item => item !== toast))
  }

  /**
   * Show a toast.
   */
  show(toast: Toast) {
    const newToast = { ...toast, severity: toast.severity || 'default' }

    this.toast$.update(toasts => [...toasts, newToast])
  }
}
