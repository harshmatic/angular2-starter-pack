import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { JobRouting } from './job.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { JobDetailComponent } from './components/jobDetail/jobDetail.component';
import { JobEditComponent } from './components/jobEdit/jobEdit.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { AddJobComponent } from './components/addJob/addJob.component';
import { EmployeeEffects } from '../employee/store/employee.effects';
import { OccurenceTypeEffects } from '../occurenceType/store/occurenceType.effects';
import { OccurenceBookEffects } from '../occurenceBook/store/occurenceBook.effects';
import { DepartmentEffects } from '../department/store/department.effects';
import { EmployeeService } from '../employee/services/employee.service';
import { DepartmentService } from '../department/services/department.service';
import { OccurenceTypeService } from '../occurenceType/services/occurenceType.service';
import { OccurenceBookService } from '../occurenceBook/services/occurenceBook.service';
import { JobService } from './services/job.service';
import { StatusService } from '../status/services/status.service';
import { StatusEffects } from '../status/store/status.effects';
import { ActivityService } from '../activity/services/activity.service';
import { ActivityEffects } from '../activity/store/activity.effects';
import { AreaService } from '../area/services/area.service';
import { AreaEffects } from '../area/store/area.effects';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    JobRouting,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.run(EmployeeEffects),
    EffectsModule.run(OccurenceTypeEffects),
    EffectsModule.run(DepartmentEffects),
    EffectsModule.run(OccurenceBookEffects),
    EffectsModule.run(StatusEffects),
    EffectsModule.run(AreaEffects),
    EffectsModule.run(ActivityEffects),
    AgmCoreModule

  ],
  declarations: [
    JobDetailComponent,
    ActivityFeedComponent,
    AddJobComponent,
    JobEditComponent
  ],
  providers: [EmployeeService, DepartmentService, ActivityService,OccurenceTypeService, JobService, OccurenceBookService, StatusService, AreaService]

})
export default class JobModule { }
