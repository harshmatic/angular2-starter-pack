import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    //component: ReportsComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

//export const routedComponents = [ReportsComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRouting { }