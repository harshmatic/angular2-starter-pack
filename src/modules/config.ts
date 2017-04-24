import { RouterModule, Routes } from '@angular/router';
import {OccurenceBookReducer} from './occurenceBook/store/occurenceBook.reducer';
import {DashboardReducer} from './dashboard/store/dashboard.reducer';
import {AreaReducer} from './area/store/area.reducer';
import {OccurenceTypeReducer} from './occurenceType/store/occurenceType.reducer';
import {StatusReducer} from './status/store/status.reducer';
export const routing = [


  { path: 'ob', loadChildren: 'modules/occurenceBook/occurenceBook.module' },
  { path: 'area' , loadChildren:'modules/area/area.module' },
  { path: 'ot' , loadChildren:'modules/occurenceType/occurenceType.module' },
  {path: 'status' , loadChildren:'modules/status/status.module'},
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
  dashboard: DashboardReducer,
  area: AreaReducer,
  occurenceType:OccurenceTypeReducer,
  status:StatusReducer
}
