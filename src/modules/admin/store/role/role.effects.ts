import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import { ROLE_ACTIONS } from './role.actions';
import {  UserService } from '../../services/user.service';
import {  RoleService } from '../../services/role.service';

@Injectable()
export class RoleEffects{

  @Effect({ dispatch: false })
  private getRoles$ = this.actions$
    .ofType(ROLE_ACTIONS.GET_LIST)
   .switchMap(action => 
       this.roleService.getRoles()
        .map(res =>{
          this.store.dispatch({ type: ROLE_ACTIONS.GET_LIST_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: ROLE_ACTIONS.ON_FAILED  }))
      );
  @Effect({ dispatch: false })
  private getRolePermission$ = this.actions$
    .ofType(ROLE_ACTIONS.GET_ROLE_PERMISSION_LIST)
   .switchMap(action => 
       this.roleService.getRolePermissions(action.payload.roleId)
        .map(res =>{
          this.store.dispatch({ type: ROLE_ACTIONS.GET_ROLE_PERMISSION_LIST_SUCCESS, payload: res})
        })
        .catch(() => Observable.of({ type: ROLE_ACTIONS.ON_FAILED  }))
      );
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private roleService: RoleService,
  ) {}
}
