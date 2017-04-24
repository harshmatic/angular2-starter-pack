import { RouterModule, Routes } from '@angular/router';
import * as CounterReducer from './counter/store/counter.reducer';
import {EmployeeReducer} from './employee/store/employee.reducer';
import {OccurenceBookReducer} from './occurenceBook/store/occurenceBook.reducer';
import {DashboardReducer} from './dashboard/store/dashboard.reducer';
import { Counter } from './counter/store/counter.model';

export const routing = [

  { path: 'counter', loadChildren: 'modules/counter/counter.module#CounterModule' },
  { path: 'employee', loadChildren: 'modules/employee/employee.module' },
  { path: 'ob', loadChildren: 'modules/occurenceBook/occurenceBook.module' },
  { path: 'dashboard', loadChildren: 'modules/dashboard/dashboard.module' },
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

export const ApiBase = "http://192.168.100.103:6070/api/";
export const ApiBaseAuthUrl = "auth/token";

export interface RootState {
  counter: Counter;
}


export const moduleReducers = {
  counter: CounterReducer.reducer,
  employee: EmployeeReducer,
  occurenceBook:OccurenceBookReducer,
  dashboard: DashboardReducer
}
