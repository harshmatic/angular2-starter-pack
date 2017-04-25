import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { OccurenceReviewHistory, initialOccurenceReviewHistory } from './occurenceReviewHistory.model';
import { ORH_ACTIONS } from './occurenceReviewHistory.actions';


export function OccurenceReviewHistoryReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case ORH_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case ORH_ACTIONS.ON_FAILED:
        return state;
    case ORH_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case ORH_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case ORH_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
