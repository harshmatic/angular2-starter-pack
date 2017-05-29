import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Department, initialDepartment } from './department.model';
import { DEPARTMENT_ACTIONS } from './department.actions';

let initialState={departmentList:[],pagination:{}}
export function DepartmentReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case DEPARTMENT_ACTIONS.GET_LIST_SUCCESS:
        return Object.assign({},state,{departmentList:action.payload});
    case DEPARTMENT_ACTIONS.GET_LIST_PAGINATION_SUCCESS:
        return Object.assign({},state,{departmentList:action.payload.departments,pagination:action.payload.pagination});
    case DEPARTMENT_ACTIONS.ON_FAILED:
        return state;
    case DEPARTMENT_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case DEPARTMENT_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case DEPARTMENT_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    default:
        return state;
  }
}
