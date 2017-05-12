import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignationRouting } from './designation.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { DesignationComponent } from './components/designation.component';
import { DesignationEffects } from './store/designation.effects';
import { DesignationService } from './services/designation.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DesignationRouting,
    EffectsModule.run(DesignationEffects)
  ],
  declarations: [
    DesignationComponent
  ],
  providers:[DesignationService]
})
export class DesignationModule { }
