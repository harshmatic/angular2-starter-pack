import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { OccurenceBook, initialOccurenceBook } from './occurenceBook.model';
import { OB_ACTIONS } from './occurenceBook.actions';


export function OccurenceBookReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case OB_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case OB_ACTIONS.ON_FAILED:
        return state;
    case OB_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case OB_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case OB_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    case OB_ACTIONS.GET_OB_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
