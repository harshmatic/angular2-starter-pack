import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';

import { Counter, initialCounter } from './counter.model';

import { COUNTER_ACTIONS } from './counter.actions';
@Injectable()
export class CounterEffects {
  @Effect({ dispatch: false })
  private reset$ = this.actions$
    .ofType(COUNTER_ACTIONS.INIT)
    .map((action: Action) => {
      if (!action.payload.token) {
     //   return new SliceActions.Update(slices.COUNTER, [], initialCounter);
      } else {
        return empty()
      }
    });
  constructor(
    private store: Store<Counter>,
    private actions$: Actions,
   // private dataService: DataService
  ) { }
}
