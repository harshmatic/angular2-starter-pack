import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { APPMODULE_ACTIONS } from './appModule.actions';

let initialState={appModuleList:[]}
export function AppModuleReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case APPMODULE_ACTIONS.GET_LIST_SUCCESS:
        return Object.assign({},state,{appModuleList:action.payload});
    case APPMODULE_ACTIONS.ON_FAILED:
        return state;
    default:
        return state;
  }
}
