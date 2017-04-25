import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { OccurenceAssignment, initialOccurenceAssignment } from './occurenceAssignment.model';
import { OA_ACTIONS } from './occurenceAssignment.actions';
import {  OccurenceAssignmentService } from '../services/occurenceAssignment.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';


/// Define the appi endpoint here
const CONTEXT = 'occurrenceassignment';

@Injectable()
export class OccurenceAssignmentEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListOa$ = this.actions$
    .ofType(OA_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.occurenceAssignmentService.getOas()
        .map(res =>{
          this.store.dispatch({ type: OA_ACTIONS.GET_LIST_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OA_ACTIONS.ON_FAILED  }))
      );
 @Effect({ dispatch: false })
  private addOa$ = this.actions$
    .ofType(OA_ACTIONS.ADD)
   .switchMap(action => {
    return this.occurenceAssignmentService.addOa(action.payload)
        .map(res =>{
          this.store.dispatch({ type: OA_ACTIONS.ADD_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OA_ACTIONS.ON_FAILED  }))
   }
       
      );
  @Effect({ dispatch: false })
  private updateOa$ = this.actions$
    .ofType(OA_ACTIONS.UPDATE)
   .switchMap(action => 
        this.occurenceAssignmentService.saveOa(action.payload.id,action.payload.updates)
        .map(res =>{
          this.store.dispatch({ type: OA_ACTIONS.UPDATE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OA_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private deleteOa$ = this.actions$
    .ofType(OA_ACTIONS.DELETE)
   .switchMap(action => 
       this.occurenceAssignmentService.deleteOa(action.payload)
        .map(res =>{
          this.store.dispatch({ type: OA_ACTIONS.DELETE_SUCCESS, payload: res.json() })
        })
        .catch(() => Observable.of({ type: OA_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<OccurenceAssignment>,
    private actions$: Actions,
    private occurenceAssignmentService: OccurenceAssignmentService,
    public http: Http
  ) {super(http,CONTEXT); }
}
