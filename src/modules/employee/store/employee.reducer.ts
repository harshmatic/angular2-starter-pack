import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Employee, initialCounter } from './employee.model';
import { EMPLOYEE_ACTIONS } from './employee.actions';


export function EmployeeReducer(state: Employee[] = initialCounter, action: Action): Employee[] {
  switch (action.type) {
    case EMPLOYEE_ACTIONS.GET_EMPLOYEE_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.ADD_EMPLOYEE_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.ON_FAILED:
        return state;
    default:
        return state;
  }
}
