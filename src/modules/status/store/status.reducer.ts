import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Status, initialStatus } from './status.model';
import { STATUS_ACTIONS } from './status.actions';


export function StatusReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case STATUS_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case STATUS_ACTIONS.ON_FAILED:
        return state;
    case STATUS_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case STATUS_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case STATUS_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
