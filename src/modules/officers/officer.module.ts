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
import { DepartmentService } from '../department/services/department.service';
import { DepartmentEffects } from '../department/store/department.effects';
import { OccurenceBookEffects } from '../occurenceBook/store/occurenceBook.effects';
import { OccurenceBookService } from '../occurenceBook/services/occurenceBook.service';
import { AreaService } from '../area/services/area.service';
import { AreaEffects } from '../area/store/area.effects';
import { DesignationService } from '../designation/services/designation.service';
import { DesignationEffects } from '../designation/store/designation.effects';
import { ActivityService } from '../activity/services/activity.service';
import { ActivityEffects } from '../activity/store/activity.effects';
import { JobService } from '../job/services/job.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OfficerRouting,
    EffectsModule.run(EmployeeEffects),
    EffectsModule.run(DepartmentEffects),
    EffectsModule.run(OccurenceBookEffects),
    EffectsModule.run(AreaEffects),
    EffectsModule.run(DesignationEffects),
    EffectsModule.run(ActivityEffects)
  ],
  declarations: [
    OfficerListComponent,
    ActivityFeedComponent,
    AssignOfficerComponent
  ],
  providers: [EmployeeService,ActivityService, JobService, DepartmentService, OccurenceBookService, AreaService, DesignationService]
})
export class OfficerModule { }
