import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftComponent } from './components/shift.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: ShiftComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [ShiftComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRouting { }