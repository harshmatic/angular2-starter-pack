import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [DashboardComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouting { }