import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OfficerListRouting } from './officerList.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OfficerListComponent } from './components/officerList.component';
import { EmployeeEffects } from '../employee/store/employee.effects';
import { EmployeeService } from '../employee/services/employee.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OfficerListRouting,
    EffectsModule.run(EmployeeEffects)
  ],
  declarations: [
    OfficerListComponent
  ],
  providers:[EmployeeService]
})
export default class DashboardModule { }
