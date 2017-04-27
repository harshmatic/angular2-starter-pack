import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfficerListComponent } from './components/officerList/officerList.component';
import { AuthGuard } from '../../app/core/index'
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'officerList',
  },
  {
    path: 'officerList',
    component: OfficerListComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerRouting { }