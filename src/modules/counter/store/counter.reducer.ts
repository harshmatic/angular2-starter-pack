import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Counter, initialCounter } from './counter.model';
import { COUNTER_ACTIONS } from './counter.actions';


export function reducer(state: Counter = initialCounter, action: Action): Counter {
  switch (action.type) {
      case COUNTER_ACTIONS.INCREMENT:
            return {value:state.value+1};
        case COUNTER_ACTIONS.DECREMENT:
            return  {value:state.value-1};
        default:
            return state;
  }
}
