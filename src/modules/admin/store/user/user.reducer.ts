import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { USER_ACTIONS } from './user.actions';

let initialState={userList:[],pagination:{},userRole:[],user:{}}
export function UserReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case USER_ACTIONS.GET_LIST_SUCCESS:
        return Object.assign({},state,{userList:action.payload.users,pagination:action.payload.pagination});
    case USER_ACTIONS.ON_FAILED:
        return state;
    case USER_ACTIONS.GET_SUCCESS:
        return Object.assign({},state,{user:action.payload});
    case USER_ACTIONS.GET_USER_ROLE_SUCCESS:
        return Object.assign({},state,{userRole:action.payload})
    default:
        return state;
  }
}
