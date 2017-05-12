import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OccurenceBookRouting } from './occurenceBook.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OccurenceBookComponent } from './components/ob/ob.component';
import { occurenceEditComponent } from './components/occurenceEdit/occurenceEdit.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { ViewActivityFeedComponent } from './components/viewActivity/viewActivity.component';
import { AssignedComponent } from './components/assigned/assigned.component';
import { AddOccurenceComponent } from './components/addOccurence/addOccurence.component';
import { occurenceDetailComponent } from './components/occurenceDetail/occurenceDetail.component';
import { OccurenceBookEffects } from './store/occurenceBook.effects';
import { OccurenceBookService } from './services/occurenceBook.service';
import { EmployeeEffects } from '../employee/store/employee.effects';
import { OccurenceTypeEffects } from '../occurenceType/store/occurenceType.effects';
import { DepartmentEffects } from '../department/store/department.effects';
import { EmployeeService } from '../employee/services/employee.service';
import { DepartmentService } from '../department/services/department.service';
import { OccurenceTypeService } from '../occurenceType/services/occurenceType.service';
import { StatusService } from '../status/services/status.service';
import { StatusEffects } from '../status/store/status.effects';
import { ActivityService } from '../activity/services/activity.service';
import { ActivityEffects } from '../activity/store/activity.effects';
import { AreaService } from '../area/services/area.service';
import { AreaEffects } from '../area/store/area.effects';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OccurenceBookRouting,
    EffectsModule.run(OccurenceBookEffects),
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
    OccurenceBookComponent,
    ActivityFeedComponent,
    ViewActivityFeedComponent,
    AddOccurenceComponent,
    occurenceEditComponent,
    AssignedComponent,
    occurenceDetailComponent
  ],
  providers: [OccurenceBookService, EmployeeService, DepartmentService, ActivityService, OccurenceTypeService,
    OccurenceBookService, StatusService, AreaService]
})
export class OccurenceBookModule { }
