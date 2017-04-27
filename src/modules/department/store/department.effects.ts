import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Department, initialDepartment } from './department.model';
import { DEPARTMENT_ACTIONS } from './department.actions';
import {  DepartmentService } from '../services/department.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'department';

@Injectable()
export class DepartmentEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListOb$ = this.actions$
    .ofType(DEPARTMENT_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.DepartmentService.getDepartments()
        .map(res =>{
          this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: DEPARTMENT_ACTIONS.ON_FAILED  }))
      );
 @Effect({ dispatch: false })
  private addOb$ = this.actions$
    .ofType(DEPARTMENT_ACTIONS.ADD)
   .switchMap(action => {
    return this.DepartmentService.addDepartment(action.payload)
        .map(res =>{
          this.store.dispatch({ type: DEPARTMENT_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DEPARTMENT_ACTIONS.ON_FAILED  }))
   }
       
      );
  @Effect({ dispatch: false })
  private updateOb$ = this.actions$
    .ofType(DEPARTMENT_ACTIONS.UPDATE)
   .switchMap(action => 
        this.DepartmentService.saveDepartment(action.payload.id,action.payload.updates)
        .map(res =>{
          this.store.dispatch({ type: DEPARTMENT_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DEPARTMENT_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private deleteOb$ = this.actions$
    .ofType(DEPARTMENT_ACTIONS.DELETE)
   .switchMap(action => 
       this.DepartmentService.deleteDepartment(action.payload)
        .map(res =>{
          this.store.dispatch({ type: DEPARTMENT_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DEPARTMENT_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<Department>,
    private actions$: Actions,
    private DepartmentService: DepartmentService,
    public http: Http
  ) {super(http,CONTEXT); }
}
