import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { AREA_ACTIONS } from './area.actions';

let initialState={areaList:[],pagination:{}}
export function AreaReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case AREA_ACTIONS.GET_LIST_SUCCESS:
        return Object.assign({},state,{areaList:action.payload});
    case AREA_ACTIONS.ON_FAILED:
        return state;
    case AREA_ACTIONS.GET_LIST_PAGINATION_SUCCESS:
        return Object.assign({},state,{areaList:action.payload.areaList,pagination:action.payload.pagination});
    default:
        return state;
  }
}
