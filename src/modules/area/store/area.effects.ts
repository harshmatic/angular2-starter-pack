import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { AREA_ACTIONS } from './area.actions';
import {  AreaService } from '../services/area.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'area';

@Injectable()
export class AreaEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListArea$ = this.actions$
    .ofType(AREA_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.areaService.getAreas()
        .map(res =>{
          this.store.dispatch({ type: AREA_ACTIONS.GET_LIST_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: AREA_ACTIONS.ON_FAILED  }))
      );
 @Effect({ dispatch: false })
  private addArea$ = this.actions$
    .ofType(AREA_ACTIONS.ADD)
   .switchMap(action => {
    return this.areaService.addArea(action.payload)
        .map(res =>{
          this.store.dispatch({ type: AREA_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: AREA_ACTIONS.ON_FAILED  }))
   }
       
      );
  @Effect({ dispatch: false })
  private updateArea$ = this.actions$
    .ofType(AREA_ACTIONS.UPDATE)
   .switchMap(action => 
        this.areaService.saveArea(action.payload.id,action.payload.updates)
        .map(res =>{
          this.store.dispatch({ type: AREA_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: AREA_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private deleteArea$ = this.actions$
    .ofType(AREA_ACTIONS.DELETE)
   .switchMap(action => 
       this.areaService.deleteArea(action.payload)
        .map(res =>{
          this.store.dispatch({ type: AREA_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: AREA_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private areaService: AreaService,
    public http: Http
  ) {super(http,CONTEXT); }
}
