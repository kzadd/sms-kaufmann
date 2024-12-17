import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'

/**
 * Not found container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-not-found-container',
  standalone: true,
  styleUrl: './not-found-container.component.scss',
  templateUrl: './not-found-container.component.html'
})
export class NotFoundContainerComponent {}
