import { RouterModule, Routes } from '@angular/router';
import {OccurenceBookReducer} from './occurenceBook/store/occurenceBook.reducer';
import {DashboardReducer} from './dashboard/store/dashboard.reducer';

export const routing = [


  { path: 'ob', loadChildren: 'modules/occurenceBook/occurenceBook.module' },
  { path: 'dashboard', loadChildren: 'modules/dashboard/dashboard.module' },
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

export const ApiBase = "http://192.168.100.103:6070/api/";
export const ApiBaseAuthUrl = "auth/token";

export interface RootState {
}


export const moduleReducers = {
  occurenceBook:OccurenceBookReducer,
  dashboard: DashboardReducer
}
