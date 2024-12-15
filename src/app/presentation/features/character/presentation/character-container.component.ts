import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store'

import { BaseError } from '@shared/types/exception.types'
import { onGetCharacters } from '../application/character.actions'
import { characterFeature } from '../application/character.feature'
import { Character } from '../domain/character.entity'

/**
 * The Character container.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-character-container',
  standalone: true,
  templateUrl: './character-container.component.html'
})
export class CharacterContainerComponent implements OnInit {
  private _store = inject(Store)

  characters$: Signal<Character[] | undefined> = toSignal(this._store.select(characterFeature.selectCharacters))
  error$: Signal<BaseError | null | undefined> = toSignal(this._store.select(characterFeature.selectError))
  loading$: Signal<boolean | undefined> = toSignal(this._store.select(characterFeature.selectLoading))

  ngOnInit() {
    this._store.dispatch(onGetCharacters())
  }
}
