import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Status, initialStatus } from './status.model';
import { STATUS_ACTIONS } from './status.actions';

let initialState={status:[],pagination:{}}
export function StatusReducer(state: any = initialState, action: Action) {
    switch (action.type) {
        case STATUS_ACTIONS.GET_LIST_SUCCESS:
            return action.payload;
        case STATUS_ACTIONS.GET_LIST_BY_PAGINATION_SUCCESS:
            return Object.assign({},state,{status:action.payload.status,pagination:action.payload.pagination});
        case STATUS_ACTIONS.ON_FAILED:
            return state;
        case STATUS_ACTIONS.ADD_SUCCESS:
            return action.payload;
        case STATUS_ACTIONS.UPDATE_SUCCESS:
            return action.payload;
        case STATUS_ACTIONS.DELETE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
