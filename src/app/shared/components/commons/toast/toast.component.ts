import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgbToast } from '@ng-bootstrap/ng-bootstrap'

import { ToastService } from './infrastructure/toast.service'

/**
 * Toast component.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgbToast],
  selector: 'app-toast',
  standalone: true,
  styleUrl: './toast.component.scss',
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  toastService = inject(ToastService)
}
