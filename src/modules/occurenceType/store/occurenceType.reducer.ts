import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { OccurenceType, initialOccurenceType } from './occurenceType.model';
import { OT_ACTIONS } from './occurenceType.actions';


export function OccurenceTypeReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case OT_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case OT_ACTIONS.ON_FAILED:
        return state;
    case OT_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case OT_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case OT_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
