import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRouting } from './dashboard.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardEffects } from './store/dashboard.effects';
import { DashboardService } from './services/dashboard.service';

import { EmployeeEffects } from '../employee/store/employee.effects';
import { EmployeeService } from '../employee/services/employee.service';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule.forRoot(),
    ReactiveFormsModule,
    DashboardRouting,
    EffectsModule.run(DashboardEffects),
    EffectsModule.run(EmployeeEffects)
  ],
  declarations: [
    DashboardComponent
  ],
  providers:[DashboardService,EmployeeService]
})
export default class DashboardModule { }
