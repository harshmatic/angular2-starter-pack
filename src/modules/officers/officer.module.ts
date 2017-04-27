import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OfficerRouting } from './officer.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OfficerListComponent } from './components/officerList/officerList.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { EmployeeEffects } from '../employee/store/employee.effects';
import { EmployeeService } from '../employee/services/employee.service';
import { AssignOfficerComponent } from './components/assignOfficer/assignOfficer.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OfficerRouting,
    EffectsModule.run(EmployeeEffects)
  ],
  declarations: [
    OfficerListComponent,
    ActivityFeedComponent,
    AssignOfficerComponent
  ],
  providers:[EmployeeService]
})
export default class OfficerModule { }
