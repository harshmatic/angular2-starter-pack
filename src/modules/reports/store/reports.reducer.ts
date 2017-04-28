import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { REPORTS_ACTIONS } from './reports.actions';


export function ReportsReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case REPORTS_ACTIONS.GET_CASE_LIST_SUCCESS:
        return action.payload;
    case REPORTS_ACTIONS.ON_FAILED:
        return state;
    default:
        return state;
  }
}
