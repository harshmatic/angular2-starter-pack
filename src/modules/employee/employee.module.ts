import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './components/list/list.component';
import { EmployeeSaveComponent } from './components/add/add.component';
import { EmployeeRouting } from './employee.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { EmployeeComponent } from './components/employee/employee.component';
import { OfficerListComponent } from './components/officerList/officerList.component';
import { ActivityFeedComponent } from './components/activityFeed/activityFeed.component';
import { AssignOfficerComponent } from './components/assignOfficer/assignOfficer.component';
import { EmployeeEffects } from './store/employee.effects';
import { EmployeeService } from './services/employee.service';
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
import { UserEffects } from '../admin/store/user/user.effects';
import { UserService } from '../admin/services/user.service';
import { ShiftEffects } from './../shift/store/shift.effects';
import { ShiftService } from './../shift/services/shift.service';
@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    EmployeeRouting,
    EffectsModule.run(EmployeeEffects),
    EffectsModule.run(DepartmentEffects),
    EffectsModule.run(OccurenceBookEffects),
    EffectsModule.run(AreaEffects),
    EffectsModule.run(DesignationEffects),
    EffectsModule.run(ActivityEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(ShiftEffects),
  ],
  declarations: [
    EmployeeComponent,
    OfficerListComponent,
    ActivityFeedComponent,
    AssignOfficerComponent,
    EmployeeListComponent,
    EmployeeSaveComponent
  ],
  providers: [EmployeeService, ActivityService, DepartmentService, OccurenceBookService, AreaService, 
  DesignationService,UserService,ShiftService]
})
export class EmployeeModule { }
