import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserRoleComponent } from './components/user/user-role/user-role.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { AppModuleComponent } from './components/appModule/appModule.component';

import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
  },
  {
    path: 'users',
    component: UserListComponent,
    data: {
      permissions: []
    },
     canActivate: [AuthGuard],
  },{
    path: 'user/new',
    component: UserRoleComponent,
    data: {
      permissions: []
    },
     canActivate: [AuthGuard],
  },
   {
    path: 'user-role/:userId',
    component: UserRoleComponent,
    data: {
      permissions: []
    },
     canActivate: [AuthGuard],
  },
   {
    path: 'app-modules',
    component: AppModuleComponent,
    data: {
      permissions: []
    },
     canActivate: [AuthGuard],
  },
  {
    path: 'roles',
    component: RoleListComponent,
    data: {
      permissions: []
    },
     canActivate: [AuthGuard],
    
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting { }