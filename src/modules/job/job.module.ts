import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { JobRouting } from './job.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { JobDetailComponent } from './components/jobDetail/jobDetail.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { EmployeeEffects } from '../employee/store/employee.effects';
import { EmployeeService } from '../employee/services/employee.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    JobRouting,
    EffectsModule.run(EmployeeEffects)
  ],
  declarations: [
    JobDetailComponent,
    ActivityFeedComponent
  ],
  providers:[EmployeeService]
})
export default class JobModule { }
