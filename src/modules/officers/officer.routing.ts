import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfficerListComponent } from './components/officerList/officerList.component';
import { AuthGuard } from '../../app/core/index'
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { AssignOfficerComponent } from './components/assignOfficer/assignOfficer.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'officerList',
  },
  {
    path: 'officerList',
    component: OfficerListComponent,
    data: {
      permissions:['EP.R']
    },
    canActivate: [AuthGuard],
  },
   {
    path: 'activityFeed',
    component: ActivityFeedComponent,
    data: {
      permissions:['EP.R']
    },
    canActivate: [AuthGuard],
  },{
    path: 'assign-officer',
    component: AssignOfficerComponent,
    data: {
      permissions:['OB.U']
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerRouting { }