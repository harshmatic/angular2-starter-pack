import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../app/core/store';
import { Counter } from './store/counter.model';
import { COUNTER_ACTIONS } from './store/counter.actions';


@Component({
  selector: 'counter-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <rio-container testid="counter" [size]=2 [center]=true>
      <h2 data-testid="counter-heading" id="qa-counter-heading"
        class="center caps">
        Counter
      </h2>

      <rio-counter
        [value]="value$"
        (increment)="increment()"
        (decrement)="decrement()">
      </rio-counter>
    </rio-container>
  `,
  styleUrls: ['./counter.component.css']
})
export class RioCounterPage {
  value$: number;
  constructor(private store: Store<fromRoot.RootState>) {
     store.select('counter').subscribe((res:any) => this.value$ = res.value );
  }

  increment() {
    this.store.dispatch({ type: COUNTER_ACTIONS.INCREMENT })
  }

  decrement() {
    this.store.dispatch({ type: COUNTER_ACTIONS.DECREMENT })
  }
}
