import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './components/employee.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  }
];

export const routedComponents = [EmployeeComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRouting { }