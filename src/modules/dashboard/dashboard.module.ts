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
import { OccurenceBookEffects } from '../occurenceBook/store/occurenceBook.effects';
import { OccurenceBookService } from '../occurenceBook/services/occurenceBook.service';
import { ReportsEffects } from '../reports/store/reports.effects';
import { ReportsService } from '../reports/services/reports.service';
import {MomentModule} from 'angular2-moment';
import { TimeAgoPipe } from './components/dashboard-time-ago.pipe';
import { AgmCoreModule  } from '@agm/core'
@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DashboardRouting,
    MomentModule,
    EffectsModule.run(DashboardEffects),
    EffectsModule.run(EmployeeEffects),
    EffectsModule.run(OccurenceBookEffects),
    EffectsModule.run(ReportsEffects),
    AgmCoreModule
  ],
  declarations: [
    DashboardComponent,
    TimeAgoPipe
  ],
  providers:[DashboardService,EmployeeService,OccurenceBookService,ReportsService]
})
export default class DashboardModule { }
