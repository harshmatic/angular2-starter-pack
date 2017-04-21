import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Employee, initialCounter } from './occurenceBook.model';
import { OB_ACTIONS } from './occurenceBook.actions';
import {  OccurenceBookService } from '../services/occurenceBook.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';

/// Define the appi endpoint here
const CONTEXT = 'occurrencebook';

@Injectable()
export class OccurenceBookEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListEmp$ = this.actions$
    .ofType(OB_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.getList$()
        .map(res =>{
          this.store.dispatch({ type: OB_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED  }))
      );
 
  constructor(
    private store: Store<Employee>,
    private actions$: Actions,
    private occurenceBookService: OccurenceBookService,
    public http: Http
  ) {super(http,CONTEXT); }
}
