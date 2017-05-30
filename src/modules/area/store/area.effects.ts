import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { AREA_ACTIONS } from './area.actions';
import {  AreaService } from '../services/area.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AreaEffects {

  @Effect({ dispatch: false })
  private getListArea$ = this.actions$
    .ofType(AREA_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.areaService.getAreas()
        .map((res:any)  => {
           if (res.status==304) {
              this.store.dispatch({ type: AREA_ACTIONS.GET_LIST_SUCCESS, payload:res.cacheData })
           }else{
              this.store.dispatch({ type: AREA_ACTIONS.GET_LIST_SUCCESS, payload:res.json() })
           }
        })
        .catch(() => Observable.of({ type: AREA_ACTIONS.ON_FAILED  }))
      );
   @Effect({ dispatch: false })
  private getListPagintaion$ = this.actions$
    .ofType(AREA_ACTIONS.GET_LIST_PAGINATION)
    .switchMap(action =>
      this.areaService.getAreaPagination(action.payload)
        .map((res:any) => {
           if (res.status==304) {
              this.store.dispatch({ type: AREA_ACTIONS.GET_LIST_SUCCESS,  payload:res.cacheData })
           }else{
              this.store.dispatch({ type: AREA_ACTIONS.GET_LIST_PAGINATION_SUCCESS, payload:{areaList:res.json(),pagination:JSON.parse(res.headers.get('X-Pagination'))} })
           }
        })
        .catch(() => Observable.of({ type: AREA_ACTIONS.ON_FAILED }))
    );
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private areaService: AreaService,
  ) { }
}
