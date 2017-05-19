import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusComponent } from './components/statusList/status.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'status-list',
  },
  {
    path: 'status-list',
    component: StatusComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [StatusComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRouting { }