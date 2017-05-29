import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { SHIFT_ACTIONS } from './shift.actions';

let initialState = { shift: [], pagination: {} }
export function ShiftReducer(state: any[] = [], action: Action) {
    switch (action.type) {
        case SHIFT_ACTIONS.GET_LIST_SUCCESS:
            return action.payload;
        case SHIFT_ACTIONS.GET_LIST_BY_PAGINATION_SUCCESS:
            return Object.assign({}, state, { shift: action.payload, pagination: action.payload.pagination });
        case SHIFT_ACTIONS.ON_FAILED:
            return state;
        case SHIFT_ACTIONS.ADD_SUCCESS:
            return action.payload;
        case SHIFT_ACTIONS.UPDATE_SUCCESS:
            return action.payload;
        case SHIFT_ACTIONS.DELETE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
