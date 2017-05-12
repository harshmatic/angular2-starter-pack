import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook, initialOccurenceBook } from './occurenceBook.model';
import { OB_ACTIONS } from './occurenceBook.actions';
import { OccurenceBookService } from '../services/occurenceBook.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class OccurenceBookEffects {

  @Effect({ dispatch: false })
  private getListOb$ = this.actions$
    .ofType(OB_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.occurenceBookService.getObs(action.payload.search,action.payload.pageNum,action.payload.pageSize,action.payload.areaId)
        .map(res =>{
          this.store.dispatch({ type: OB_ACTIONS.GET_LIST_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED }))
    );
    @Effect({ dispatch: false })
  private getListObOff$ = this.actions$
    .ofType(OB_ACTIONS.GET_LIST_BY_OFFICER)
   .switchMap(action => 
       this.occurenceBookService.getObsOff(action.payload.search,action.payload.pageNum,action.payload.pageSize,action.payload.assignedTo)
        .map(res =>{
          this.store.dispatch({ type: OB_ACTIONS.GET_LIST_SUCCESS_BY_OFFICER, payload: res })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED }))
    );

  @Effect({ dispatch: false })
  private getOb$ = this.actions$
    .ofType(OB_ACTIONS.GET_OB)
    .switchMap(action =>
      this.occurenceBookService.getOb(action.payload.id)
        .map(res => {
          this.store.dispatch({ type: OB_ACTIONS.GET_OB_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED }))
    );

  @Effect({ dispatch: false })
  private addOb$ = this.actions$
    .ofType(OB_ACTIONS.ADD)
    .switchMap(action => {
      return this.occurenceBookService.addOb(action.payload)
        .map(res => {
          this.store.dispatch({ type: OB_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED }))
    }

    );
  @Effect({ dispatch: false })
  private updateOb$ = this.actions$
    .ofType(OB_ACTIONS.UPDATE)
    .switchMap(action =>
      this.occurenceBookService.saveOb(action.payload.id, action.payload.updates)
        .map(res => {
          this.store.dispatch({ type: OB_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private deleteOb$ = this.actions$
    .ofType(OB_ACTIONS.DELETE)
    .switchMap(action =>
      this.occurenceBookService.deleteOb(action.payload)
        .map(res => {
          this.store.dispatch({ type: OB_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OB_ACTIONS.ON_FAILED }))
    );
  constructor(
    private store: Store<OccurenceBook>,
    private actions$: Actions,
    private occurenceBookService: OccurenceBookService,
  ) {}
}
