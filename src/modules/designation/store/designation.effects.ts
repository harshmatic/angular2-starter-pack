import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Designation, initialDesignation } from './designation.model';
import { DESIGNATION_ACTIONS } from './designation.actions';
import {  DesignationService } from '../services/designation.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'designation';

@Injectable()
export class DesignationEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListDesignation$ = this.actions$
    .ofType(DESIGNATION_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.DesignationService.getDesignations()
        .map(res =>{
          this.store.dispatch({ type: DESIGNATION_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DESIGNATION_ACTIONS.ON_FAILED  }))
      );
 @Effect({ dispatch: false })
  private addDesignation$ = this.actions$
    .ofType(DESIGNATION_ACTIONS.ADD)
   .switchMap(action => {
    return this.DesignationService.addDesignation(action.payload)
        .map(res =>{
          this.store.dispatch({ type: DESIGNATION_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DESIGNATION_ACTIONS.ON_FAILED  }))
   }
       
      );
  @Effect({ dispatch: false })
  private updateDesignation$ = this.actions$
    .ofType(DESIGNATION_ACTIONS.UPDATE)
   .switchMap(action => 
        this.DesignationService.saveDesignation(action.payload.id,action.payload.updates)
        .map(res =>{
          this.store.dispatch({ type: DESIGNATION_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DESIGNATION_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private deleteDesignation$ = this.actions$
    .ofType(DESIGNATION_ACTIONS.DELETE)
   .switchMap(action => 
       this.DesignationService.deleteDesignation(action.payload)
        .map(res =>{
          this.store.dispatch({ type: DESIGNATION_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: DESIGNATION_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<Designation>,
    private actions$: Actions,
    private DesignationService: DesignationService,
    public http: Http
  ) {super(http,CONTEXT); }
}
