import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Employee, initialCounter } from './employee.model';
import { EMPLOYEE_ACTIONS } from './employee.actions';
import { EmployeeService } from '../services/employee.service';
// import { BaseService } from '../../../app/core/services/index';
import { BaseService } from 'kenya-project-pkg/src/app/core/services/index';

import { Http, Headers, RequestOptions } from '@angular/http';

/// Define the appi endpoint here
const CONTEXT = 'employee';

@Injectable()
export class EmployeeEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListEmp$ = this.actions$
    .ofType(EMPLOYEE_ACTIONS.GET_EMPLOYEE_LIST)
   .switchMap(action => 
       this.getList$()
        .map(res =>{
          this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_EMPLOYEE_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: EMPLOYEE_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private add$ = this.actions$
    .ofType(EMPLOYEE_ACTIONS.ADD_EMPLOYEE)
   .switchMap(action => 
       this.post$('{"name":"harry"}',false)
        .map(res =>{
          this.store.dispatch({ type: EMPLOYEE_ACTIONS.ADD_EMPLOYEE_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: EMPLOYEE_ACTIONS.ON_FAILED  }))
      );

  constructor(
    private store: Store<Employee>,
    private actions$: Actions,
    private employeeService: EmployeeService,
    public http: Http
  ) {super(http,CONTEXT); }
}
