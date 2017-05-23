import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { ROLE_ACTIONS } from './role.actions';

let initialState={roleList:[],rolePermissions:[]}
export function RoleReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case ROLE_ACTIONS.GET_LIST_SUCCESS:
        return Object.assign({},state,{roleList:action.payload});
    case ROLE_ACTIONS.ON_FAILED:
        return state;
    case ROLE_ACTIONS.GET_ROLE_PERMISSION_LIST_SUCCESS:
        return  Object.assign({},state,{rolePermissions:action.payload});
    default:
        return state;
  }
}
