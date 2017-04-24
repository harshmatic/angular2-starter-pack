import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { OccurenceType, initialOccurenceType } from './occurenceType.model';
import { OT_ACTIONS } from './occurenceType.actions';
import {  OccurenceTypeService } from '../services/occurenceType.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'occurrencetype';

@Injectable()
export class OccurenceTypeEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListOt$ = this.actions$
    .ofType(OT_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.occurenceTypeService.getOts()
        .map(res =>{
          this.store.dispatch({ type: OT_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OT_ACTIONS.ON_FAILED  }))
      );
 @Effect({ dispatch: false })
  private addOt$ = this.actions$
    .ofType(OT_ACTIONS.ADD)
   .switchMap(action => {
    return this.occurenceTypeService.addOt(action.payload)
        .map(res =>{
          this.store.dispatch({ type: OT_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OT_ACTIONS.ON_FAILED  }))
   }
       
      );
  @Effect({ dispatch: false })
  private updateOt$ = this.actions$
    .ofType(OT_ACTIONS.UPDATE)
   .switchMap(action => 
        this.occurenceTypeService.saveOt(action.payload.id,action.payload.updates)
        .map(res =>{
          this.store.dispatch({ type: OT_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OT_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private deleteOt$ = this.actions$
    .ofType(OT_ACTIONS.DELETE)
   .switchMap(action => 
       this.occurenceTypeService.deleteOt(action.payload)
        .map(res =>{
          this.store.dispatch({ type: OT_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OT_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<OccurenceType>,
    private actions$: Actions,
    private occurenceTypeService: OccurenceTypeService,
    public http: Http
  ) {super(http,CONTEXT); }
}
