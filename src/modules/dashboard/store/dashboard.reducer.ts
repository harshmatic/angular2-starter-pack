import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { DASHBOARD_ACTIONS } from './dashboard.actions';


export function DashboardReducer(state:any, action: Action) {
  switch (action.type) {
    case DASHBOARD_ACTIONS.GET_DASHBOARD_SUCCESS:
        return action.payload;
    case DASHBOARD_ACTIONS.ADD_DASHBOARD_SUCCESS:
        return action.payload;
    case DASHBOARD_ACTIONS.ON_FAILED:
        return state;
    default:
        return state;
  }
}
