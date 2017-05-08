import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import {  ActivityRouting } from './activity.routing';
import { SharedModule } from '../../app/shared/shared.module';
import {ActivityComponent } from './component/activity.component';
import { ActivityEffects } from './store/activity.effects';
import { ActivityService } from './services/activity.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ActivityRouting,
    EffectsModule.run(ActivityEffects)
  ],
  declarations: [
    ActivityComponent
  ],
  providers:[ActivityService]
})
export default class ActivityModule { }
