import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../app/shared/shared.module';
import { ReportsComponent } from './components/reports.component';
import { ReportsEffects } from './store/reports.effects';
import { ReportsService } from './services/reports.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.run(ReportsEffects)
  ],
  declarations: [
    ReportsComponent
  ],
  providers:[ReportsService]
})
export class ReportModule { }
