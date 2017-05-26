import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action,Store } from '@ngrx/store';
import { OB_ACTIONS } from './occurenceBook.actions';

export function OccurenceBookReducer(state: any = {data:[],etag:''}, action: Action) {
  switch (action.type) {
    case OB_ACTIONS.GET_LIST_SUCCESS:
        let ob=Object.assign({data:[],etag:''},state)
        let stateOB:any = {data:[],etag:''};
        stateOB.data=ob.data.concat(action.payload.data);
        stateOB.etag=action.payload.etag;
        return Object.assign({},state,stateOB);
    case OB_ACTIONS.GET_LIST_SUCCESS_BY_OFFICER:
        return action.payload;
    case OB_ACTIONS.GET_OB_SUCCESS:
        return action.payload;
    case OB_ACTIONS.CLEAR:
        return [];
    case OB_ACTIONS.ON_FAILED:
        return state;
    default:
        return state;
  }
}
