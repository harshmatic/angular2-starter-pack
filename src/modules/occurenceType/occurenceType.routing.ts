import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OccurenceTypeComponent } from './components/ot.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: OccurenceTypeComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [OccurenceTypeComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurenceTypeRouting { }