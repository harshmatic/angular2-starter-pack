import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { USER_ACTIONS } from './user.actions';
import {  UserService } from '../../services/user.service';

@Injectable()
export class UserEffects{

  @Effect({ dispatch: false })
  private getListUser$ = this.actions$
    .ofType(USER_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.userService.getUsers()
        .map(res =>{
          this.store.dispatch({ type: USER_ACTIONS.GET_LIST_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: USER_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private getUserById$ = this.actions$
    .ofType(USER_ACTIONS.GET)
   .switchMap(action => 
       this.userService.getUserByID(action.payload.id)
        .map(res =>{
          this.store.dispatch({ type: USER_ACTIONS.GET_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: USER_ACTIONS.ON_FAILED  }))
      );
      
  @Effect({ dispatch: false })
  private getUserRoles$ = this.actions$
    .ofType(USER_ACTIONS.GET_USER_ROLE)
   .switchMap(action => 
       this.userService.getUserRoles(action.payload.id)
        .map(res =>{
          this.store.dispatch({ type: USER_ACTIONS.GET_USER_ROLE_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: USER_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
