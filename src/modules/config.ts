import { RouterModule, Routes } from '@angular/router';
import * as CounterReducer from './counter/store/counter.reducer';
import {EmployeeReducer} from './employee/store/employee.reducer';
import { Counter } from './counter/store/counter.model';

export const routing = [

  { path: 'counter', loadChildren: 'modules/counter/counter.module#CounterModule' },
  { path: 'employee', loadChildren: 'modules/employee/employee.module' },
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

export const ApiBase = "http://localhost:3100/api/";

export interface RootState {
  counter: Counter;
}


export const moduleReducers = {
  counter: CounterReducer.reducer,
  employee: EmployeeReducer,
}
