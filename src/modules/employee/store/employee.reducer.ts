import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Employee, initialEmployee } from './employee.model';
import { EMPLOYEE_ACTIONS } from './employee.actions';

let initialState={employeeList:[],pagination:{}}
export function EmployeeReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case EMPLOYEE_ACTIONS.GET_LIST_SUCCESS:
         return Object.assign({},state,{employeeList:action.payload});
    case EMPLOYEE_ACTIONS.GET_LIST_PAGINATION_SUCCESS:
        return Object.assign({},state,{employeeList:action.payload.employees,pagination:action.payload.pagination});
    case EMPLOYEE_ACTIONS.GET_LIST_SUCCESS_BY_ID:
        return action.payload;
    case EMPLOYEE_ACTIONS.ON_FAILED:
        return state;
    case EMPLOYEE_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.DELETE_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.GET_LIST_BY_DEPT_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.GET_LIST_BY_PAGE_SUCCESS:
        let emp=Object.assign([],state.employeeList)
        let stateEmp=emp.concat(action.payload)
        return Object.assign({},state,{employeeList:stateEmp});
    case EMPLOYEE_ACTIONS.CLEAR:
        return initialState;
    default:
        return state;
  }
}
