import { RouterModule, Routes } from '@angular/router';
import {OccurenceBookReducer} from './occurenceBook/store/occurenceBook.reducer';
import {DashboardReducer} from './dashboard/store/dashboard.reducer';
import {DepartmentReducer} from './department/store/department.reducer';
import {DesignationReducer} from './designation/store/designation.reducer';
import {ShiftReducer} from './shift/store/shift.reducer';

export const routing = [


  { path: 'ob', loadChildren: 'modules/occurenceBook/occurenceBook.module' },
  { path: 'dashboard', loadChildren: 'modules/dashboard/dashboard.module' },
  { path: 'department', loadChildren: 'modules/department/department.module' },
  { path: 'shift', loadChildren: 'modules/shift/shift.module' },
  { path: 'designation', loadChildren: 'modules/designation/designation.module' },
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

export const ApiBase = "http://192.168.100.103:6070/api/";
export const ApiBaseAuthUrl = "auth/token";

export interface RootState {
}


export const moduleReducers = {
  occurenceBook:OccurenceBookReducer,
  dashboard: DashboardReducer,
  department:DepartmentReducer,
  designation:DesignationReducer,
  shift:ShiftReducer,
  
}
