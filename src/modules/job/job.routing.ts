import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobDetailComponent } from './components/jobDetail/jobDetail.component';
import { JobEditComponent } from './components/jobEdit/jobEdit.component';
import { AuthGuard } from '../../app/core/index';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { AddJobComponent } from './components/addJob/addJob.component';
import { AssignedComponent } from './components/assigned/assigned.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'jobDetails',
  },
  {
    path: 'jobDetails',
    component: JobDetailComponent,
    data: {
       permissions:['OB.R']
    },
    canActivate: [AuthGuard],
  },
   {
    path: 'activityFeed',
    component: ActivityFeedComponent,
    data: {
       permissions:['OB.R']
    },
    canActivate: [AuthGuard],
  },
   {
    path: 'addJob',
    component: AddJobComponent,
    data: {
       permissions:['OB.C']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'jobEdit',
    component: JobEditComponent,
    data: {
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'myObs',
    component: AssignedComponent,
    data: {
    },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRouting { }