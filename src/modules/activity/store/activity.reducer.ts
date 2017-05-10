import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { ACTIVITY_ACTIONS } from './activity.actions';


export function ActivityReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case ACTIVITY_ACTIONS.GET_LIST_SUCCESS:
        let activity=Object.assign([],state)
        let stateActivity=activity.concat(action.payload)
        return Object.assign([],state,stateActivity);
    case ACTIVITY_ACTIONS.ON_FAILED:
        return state;
    case ACTIVITY_ACTIONS.CLEAR:
        return [];
    default:
        return state;
  }
}
