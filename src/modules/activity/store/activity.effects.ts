import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { ACTIVITY_ACTIONS } from './activity.actions';
import { ActivityService } from '../services/activity.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';



@Injectable()
export class ActivityEffects{

  @Effect({ dispatch: false })
  private getActivity$ = this.actions$
    .ofType(ACTIVITY_ACTIONS.GET_LIST)
    .switchMap(action =>
      this.activityService.getActivity(action.payload.pageNum, action.payload.pageSize)
        .map((res:any) => {
           if (res.status==304) {
              this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST_SUCCESS, payload:res.cacheData })
           }else{
              this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST_SUCCESS, payload:res.json() })
           }
        })
        .catch(() => Observable.of({ type: ACTIVITY_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private getActivityByOB$ = this.actions$
    .ofType(ACTIVITY_ACTIONS.GET_LIST_BY_OB)
    .switchMap(action =>
      this.activityService.getActivityByOB(action.payload.pageNum, action.payload.pageSize,action.payload.obID)
        .map((res:any) => {
           if (res.status==304) {
              this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST_BY_OB_SUCCESS, payload:res.cacheData })
           }else{
              this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST_BY_OB_SUCCESS, payload:res.json() })
           }
        })
        .catch(() => Observable.of({ type: ACTIVITY_ACTIONS.ON_FAILED }))
    );

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private activityService: ActivityService
  ) {  }
}
