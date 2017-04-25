import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Area, initialArea } from './area.model';
import { AREA_ACTIONS } from './area.actions';


export function AreaReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case AREA_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case AREA_ACTIONS.ON_FAILED:
        return state;
    case AREA_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case AREA_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case AREA_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
