import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EsplCounterPage } from './counter.page';

const routes: Routes = [
  {
    path: '',
    component: EsplCounterPage
  }
];

export const routedComponents = [EsplCounterPage];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterRouting { }