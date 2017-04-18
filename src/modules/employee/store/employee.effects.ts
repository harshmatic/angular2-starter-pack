import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Employee, initialCounter } from './employee.model';
import { EMPLOYEE_ACTIONS } from './employee.actions';
import { EmployeeService } from '../services/employee.service';
@Injectable()
export class EmployeeEffects {
  @Effect({ dispatch: false })
  private getList$ = this.actions$
    .ofType(EMPLOYEE_ACTIONS.GET_EMPLOYEE_LIST)
   .switchMap(action => 
       this.employeeService.getEmployeeList()
        .map(res =>{
          debugger
         this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_EMPLOYEE_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: EMPLOYEE_ACTIONS.ON_FAILED  }))
      );


  constructor(
    private store: Store<Employee>,
    private actions$: Actions,
    private employeeService: EmployeeService
  ) { }
}
