import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Designation, initialDesignation } from './designation.model';
import { DESIGNATION_ACTIONS } from './designation.actions';


export function DesignationReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case DESIGNATION_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case DESIGNATION_ACTIONS.ON_FAILED:
        return state;
    case DESIGNATION_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case DESIGNATION_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case DESIGNATION_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
