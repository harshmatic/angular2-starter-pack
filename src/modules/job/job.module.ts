import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { JobRouting } from './job.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { JobDetailComponent } from './components/jobDetail/jobDetail.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { AddJobComponent } from './components/addJob/addJob.component';
import { EmployeeEffects } from '../employee/store/employee.effects';
import { OccurenceTypeEffects } from '../occurenceType/store/occurenceType.effects';
import { DepartmentEffects } from '../department/store/department.effects';
import { EmployeeService } from '../employee/services/employee.service';
import { DepartmentService } from '../department/services/department.service';
import { OccurenceTypeService } from '../occurenceType/services/occurenceType.service';
import { JobService } from './services/job.service';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    JobRouting,
    EffectsModule.run(EmployeeEffects),
    EffectsModule.run(OccurenceTypeEffects),
    EffectsModule.run(DepartmentEffects)
  ],
  declarations: [
    JobDetailComponent,
    ActivityFeedComponent,
    AddJobComponent
  ],
  providers:[EmployeeService,DepartmentService,OccurenceTypeService,JobService]

})
export default class JobModule { }
