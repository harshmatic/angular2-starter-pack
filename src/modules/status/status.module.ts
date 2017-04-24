import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { StatusRouting } from './status.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { StatusComponent } from './components/status.component';
import { StatusEffects } from './store/status.effects';
import { StatusService } from './services/status.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    StatusRouting,
    EffectsModule.run(StatusEffects)
  ],
  declarations: [
    StatusComponent
  ],
  providers:[StatusService]
})
export default class StatusModule { }
