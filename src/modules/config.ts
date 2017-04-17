import { RouterModule, Routes } from '@angular/router';
import * as fromCounter from './counter/store/counter.reducer';
import { Counter } from './counter/store/counter.model';

export const routing = [

  { path: 'counter', loadChildren: 'modules/counter/counter.module#CounterModule' },
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

export const apiBase = "/api";

export interface RootState {
  counter: Counter;
}


export const reducerss = {
  counter: fromCounter.reducer,
}
