import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { ACTIVITY_ACTIONS } from './activity.actions';
import {  ActivityService } from '../services/activity.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'area';

@Injectable()
export class ActivityEffects extends BaseService {

  @Effect({ dispatch: false })
  private getActivity$ = this.actions$
    .ofType(ACTIVITY_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.activityService.getActivity(action.payload.pageNum,action.payload.pageSize)
        .map(res =>{
          this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: ACTIVITY_ACTIONS.ON_FAILED  }))
      );
 
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private activityService: ActivityService,
    public http: Http
  ) {super(http,CONTEXT); }
}
