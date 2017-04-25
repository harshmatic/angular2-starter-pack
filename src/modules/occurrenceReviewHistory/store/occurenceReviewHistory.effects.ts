import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { OccurenceReviewHistory, initialOccurenceReviewHistory } from './occurenceReviewHistory.model';
import { ORH_ACTIONS } from './occurenceReviewHistory.actions';
import {  OccurenceReviewHistoryService } from '../services/occurenceReviewHistory.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'occurrencereviewhistory';

@Injectable()
export class OccurenceReviewHistoryEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListOrh$ = this.actions$
    .ofType(ORH_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.occurenceReviewHistoryService.getOrhs()
        .map(res =>{
          this.store.dispatch({ type: ORH_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: ORH_ACTIONS.ON_FAILED  }))
      );
 @Effect({ dispatch: false })
  private addOrh$ = this.actions$
    .ofType(ORH_ACTIONS.ADD)
   .switchMap(action => {
    return this.occurenceReviewHistoryService.addOrh(action.payload)
        .map(res =>{
          this.store.dispatch({ type: ORH_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: ORH_ACTIONS.ON_FAILED  }))
   }
       
      );
  @Effect({ dispatch: false })
  private updateOrh$ = this.actions$
    .ofType(ORH_ACTIONS.UPDATE)
   .switchMap(action => 
        this.occurenceReviewHistoryService.saveOrh(action.payload.id,action.payload.updates)
        .map(res =>{
          this.store.dispatch({ type: ORH_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: ORH_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private deleteOrh$ = this.actions$
    .ofType(ORH_ACTIONS.DELETE)
   .switchMap(action => 
       this.occurenceReviewHistoryService.deleteOrh(action.payload)
        .map(res =>{
          this.store.dispatch({ type: ORH_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: ORH_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<OccurenceReviewHistory>,
    private actions$: Actions,
    private occurenceReviewHistoryService: OccurenceReviewHistoryService,
    public http: Http
  ) {super(http,CONTEXT); }
}
