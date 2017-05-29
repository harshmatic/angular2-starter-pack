import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { STATUS_ACTIONS } from './status.actions';
import { StatusService } from '../services/status.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'status';

@Injectable()
export class StatusEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListStatus$ = this.actions$
    .ofType(STATUS_ACTIONS.GET_LIST)
    .switchMap(action =>
      this.statusService.getStatusAll()
        .map((res:any) => {
          if (res.status==304) {
              this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST_SUCCESS, payload: res.cacheData })
           }else{
              this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
           }
      //this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: STATUS_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private getListStatusByPagination$ = this.actions$
    .ofType(STATUS_ACTIONS.GET_LIST_BY_PAGINATION)
    .switchMap(action =>
      this.statusService.getStatusAllByPagination(action.payload)
        .map((res:any) => {
         if (res.status==304) {
              this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST_BY_PAGINATION_SUCCESS, payload: res.cacheData })
           }else{
              this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST_BY_PAGINATION_SUCCESS, payload: res.json() })
           }
        })
        .catch(() => Observable.of({ type: STATUS_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private addStatus$ = this.actions$
    .ofType(STATUS_ACTIONS.ADD)
    .switchMap(action => {
      return this.statusService.addStatus(action.payload)
        .map(res => {
          this.store.dispatch({ type: STATUS_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: STATUS_ACTIONS.ON_FAILED }))
    }

    );
  @Effect({ dispatch: false })
  private updateStatus$ = this.actions$
    .ofType(STATUS_ACTIONS.UPDATE)
    .switchMap(action =>
      this.statusService.saveStatus(action.payload.id, action.payload.updates)
        .map(res => {
          this.store.dispatch({ type: STATUS_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: STATUS_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private deleteStatus$ = this.actions$
    .ofType(STATUS_ACTIONS.DELETE)
    .switchMap(action =>
      this.statusService.deleteStatus(action.payload)
        .map(res => {
          this.store.dispatch({ type: STATUS_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: STATUS_ACTIONS.ON_FAILED }))
    );
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private statusService: StatusService,
    public http: Http
  ) { super(http, CONTEXT); }
}
