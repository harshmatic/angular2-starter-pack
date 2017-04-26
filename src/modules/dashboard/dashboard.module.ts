import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRouting } from './dashboard.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardEffects } from './store/dashboard.effects';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DashboardRouting,
    EffectsModule.run(DashboardEffects)
  ],
  declarations: [
    DashboardComponent
  ],
  providers:[DashboardService]
})
export default class DashboardModule { }
