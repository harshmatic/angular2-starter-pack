import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OccurenceBookComponent } from './components/ob/ob.component';
import { AuthGuard } from '../../app/core/index';
import { OccurenceDetailComponent } from './components/occurenceDetail/occurenceDetail.component';
import { OccurenceEditComponent } from './components/occurenceEdit/occurenceEdit.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { ViewActivityFeedComponent } from './components/viewActivity/viewActivity.component';
import { AddOccurenceComponent } from './components/addOccurence/addOccurence.component';
import { AssignedComponent } from './components/assigned/assigned.component';

//Reviewed by salauddin
const routes: Routes = [
  {
    path: '',
    component: OccurenceBookComponent,
    data: {
      //permissions: ['EMPLOYEE_READ']
    },
     canActivate: [AuthGuard],
  },
   {
    path: 'occurenceDetails',
    component: OccurenceDetailComponent,
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
    path: 'addOccurence',
    component: AddOccurenceComponent,
    data: {
       permissions:['OB.C']
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'occurenceEdit',
    component: OccurenceEditComponent,
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
  },
  {
    path: 'viewActivity',
    component: ViewActivityFeedComponent,
    data: {
    },
    canActivate: [AuthGuard],
  }
];

export const routedComponents = [OccurenceBookComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccurenceBookRouting { }