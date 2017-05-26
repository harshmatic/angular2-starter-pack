import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftComponent } from './components/shiftList/shift.component';
import { ShiftAddEditComponent } from './components/shiftAddEdit/shiftAddEdit.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shift-list',
  },
  {
    path: 'shift-list',
    component: ShiftComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  },
  {
    path: 'shift-AddEdit',
    component: ShiftAddEditComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  },
  {
    path: 'shift-AddEdit/:shiftId',
    component: ShiftAddEditComponent,
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