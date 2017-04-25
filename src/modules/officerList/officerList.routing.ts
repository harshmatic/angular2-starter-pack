import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfficerListComponent } from './components/officerList.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: OfficerListComponent,
    data: {
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [OfficerListComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerListRouting { }