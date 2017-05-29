import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { APPMODULE_ACTIONS } from './appModule.actions';
import { AppModuleService } from '../../services/appModule.service';

@Injectable()
export class AppModuleEffects{

  @Effect({ dispatch: false })
  private getRoles$ = this.actions$
    .ofType(APPMODULE_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.appModuleService.getModules()
        .map((res:any)  =>{
           if (res.status==304) {
              this.store.dispatch({ type: APPMODULE_ACTIONS.GET_LIST_SUCCESS, payload:res.cacheData })
           }else{
              this.store.dispatch({ type: APPMODULE_ACTIONS.GET_LIST_SUCCESS, payload:res.json() })
           }
        })
        .catch(() => Observable.of({ type: APPMODULE_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private appModuleService: AppModuleService,
  ) {}
}
