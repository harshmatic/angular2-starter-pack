import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { OccurenceAssignment, initialOccurenceAssignment } from './occurenceAssignment.model';
import { OA_ACTIONS } from './occurenceAssignment.actions';


export function OccurenceAssignmentReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case OA_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case OA_ACTIONS.ON_FAILED:
        return state;
    case OA_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case OA_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case OA_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
