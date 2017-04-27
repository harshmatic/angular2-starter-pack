import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobDetailComponent } from './components/jobDetail/jobDetail.component';
import { AuthGuard } from '../../app/core/index'
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { AddJobComponent } from './components/addJob/addJob.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'jobDetails',
  },
  {
    path: 'jobDetails',
    component: JobDetailComponent,
    data: {
    },
    canActivate: [AuthGuard],
  },
   {
    path: 'activityFeed',
    component: ActivityFeedComponent,
    data: {
    },
    canActivate: [AuthGuard],
  },
   {
    path: 'addJob',
    component: AddJobComponent,
    data: {
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRouting { }