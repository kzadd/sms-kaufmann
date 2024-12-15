import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CharacterContainer } from '../features/character'

/**
 * Character page.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CharacterContainer],
  selector: 'app-character-page',
  standalone: true,
  template: `<app-character-container />`
})
export class CharacterPageComponent {}
