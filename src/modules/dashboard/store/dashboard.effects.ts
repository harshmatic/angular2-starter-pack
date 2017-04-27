import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { Dashboard, initialCounter } from './dashboard.model';
import { DASHBOARD_ACTIONS } from './dashboard.actions';
import { DashboardService } from '../services/dashboard.service';
import { BaseService } from '../../../app/core/services/index';
import { Http, Headers, RequestOptions } from '@angular/http';

/// Define the appi endpoint here
const CONTEXT = 'dashboard';

@Injectable()
export class DashboardEffects extends BaseService {

  @Effect({ dispatch: false })
  private getListEmp$ = this.actions$
    .ofType(DASHBOARD_ACTIONS.GET_DASHBOARD_LIST)
   .switchMap(action => 
       this.getList$(CONTEXT)
       
        .map(res =>{
          //this.store.dispatch({ type: DASHBOARD_ACTIONS.GET_DASHBOARD_SUCCESS, payload: res })
           this.store.dispatch({ type: DASHBOARD_ACTIONS.GET_DASHBOARD_SUCCESS, payload: res })
        })
        .catch(() => Observable.of({ type: DASHBOARD_ACTIONS.ON_FAILED  }))
      );
  // @Effect({ dispatch: false })
  // private add$ = this.actions$
  //   .ofType(DASHBOARD_ACTIONS.ADD_DASHBOARD)
  //  .switchMap(action => 
  //      this.post$('{"name":"harry"}',false)
  //       .map(res =>{
  //         this.store.dispatch({ type: DASHBOARD_ACTIONS.ADD_DASHBOARD_SUCCESS, payload: res })
  //       })
  //       .catch(() => Observable.of({ type: DASHBOARD_ACTIONS.ON_FAILED  }))
  //     );

  constructor(
    private store: Store<Dashboard>,
    private actions$: Actions,
    private dashboardService: DashboardService,
    public http: Http
  ) {super(http,CONTEXT); }
}
