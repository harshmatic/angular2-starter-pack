import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationListComponent } from './components/designationList/designationList.component';
import { DesignationComponent } from './components/designation.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: DesignationListComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [DesignationComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRouting { }