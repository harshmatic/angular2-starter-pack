import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Shift, initialShift } from './shift.model';
import { SHIFT_ACTIONS } from './shift.actions';
import { ShiftService } from '../services/shift.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'shift';

@Injectable()
export class ShiftEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListShift$ = this.actions$
    .ofType(SHIFT_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.ShiftService.getShifts()
        .map(res =>{
          this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: SHIFT_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private getListShiftByPagination$ = this.actions$
    .ofType(SHIFT_ACTIONS.GET_LIST_BY_PAGINATION)
    .switchMap(action =>
      this.ShiftService.getShiftsByPagination(action.payload)
        .map(res => {
          this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST_BY_PAGINATION_SUCCESS, payload: {shift:res.json(),pagination:JSON.parse(res.headers.get('X-Pagination'))} })
        })
        .catch(() => Observable.of({ type: SHIFT_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private addShift$ = this.actions$
    .ofType(SHIFT_ACTIONS.ADD)
    .switchMap(action => {
      return this.ShiftService.addShift(action.payload)
        .map(res => {
          this.store.dispatch({ type: SHIFT_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: SHIFT_ACTIONS.ON_FAILED }))
    }

    );
  @Effect({ dispatch: false })
  private updateShift$ = this.actions$
    .ofType(SHIFT_ACTIONS.UPDATE)
    .switchMap(action =>
      this.ShiftService.saveShift(action.payload.id, action.payload.updates)
        .map(res => {
          this.store.dispatch({ type: SHIFT_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: SHIFT_ACTIONS.ON_FAILED }))
    );
  @Effect({ dispatch: false })
  private deleteShift$ = this.actions$
    .ofType(SHIFT_ACTIONS.DELETE)
    .switchMap(action =>
      this.ShiftService.deleteShift(action.payload)
        .map(res => {
          this.store.dispatch({ type: SHIFT_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: SHIFT_ACTIONS.ON_FAILED }))
    );
  constructor(
    private store: Store<Shift>,
    private actions$: Actions,
    private ShiftService: ShiftService,
    public http: Http
  ) { super(http, CONTEXT); }
}
