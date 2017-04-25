import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OccurenceReviewHistoryComponent } from './components/orh.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: OccurenceReviewHistoryComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [OccurenceReviewHistoryComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurenceReviewHistoryRouting { }