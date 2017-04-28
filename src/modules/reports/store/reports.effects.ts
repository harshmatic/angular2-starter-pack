import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { REPORTS_ACTIONS } from './reports.actions';
import {  ReportsService } from '../services/reports.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'occurrencetype';

@Injectable()
export class ReportsEffects extends BaseService {

  @Effect({ dispatch: false })
  private getCaseReport$ = this.actions$
    .ofType(REPORTS_ACTIONS.GET_CASE_LIST)
   .switchMap(action => 
       this.reportsService.getReport("reports/GetOccurrenceBooksStatistics")
        .map(res =>{
          this.store.dispatch({ type: REPORTS_ACTIONS.GET_CASE_LIST_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: REPORTS_ACTIONS.ON_FAILED  }))
      );

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private reportsService: ReportsService,
    public http: Http
  ) {super(http,CONTEXT); }
}
