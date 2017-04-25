import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OccurenceAssignmentComponent } from './components/oa.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: OccurenceAssignmentComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [OccurenceAssignmentComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurenceAssignmentRouting { }