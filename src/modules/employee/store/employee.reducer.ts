import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ActionReducer, Action } from '@ngrx/store';
import { Employee, initialEmployee } from './employee.model';
import { EMPLOYEE_ACTIONS } from './employee.actions';


export function EmployeeReducer(state: any[] = [], action: Action) {
  switch (action.type) {
    case EMPLOYEE_ACTIONS.GET_LIST_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.ON_FAILED:
        return state;
    case EMPLOYEE_ACTIONS.ADD_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.UPDATE_SUCCESS:
        return action.payload;
    case EMPLOYEE_ACTIONS.DELETE_SUCCESS:
        return action.payload;
<<<<<<< HEAD
    case EMPLOYEE_ACTIONS.GET_LIST_BY_DEPT_SUCCESS:
        return action.payload;

=======
    case EMPLOYEE_ACTIONS.GET_LIST_BY_PAGE_SUCCESS:
        return action.payload
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
    default:
        return state;
  }
}
