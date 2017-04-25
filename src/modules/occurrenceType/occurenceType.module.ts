import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OccurenceTypeRouting } from './occurenceType.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OccurenceTypeComponent } from './components/ot.component';
import { OccurenceTypeEffects } from './store/occurenceType.effects';
import { OccurenceTypeService } from './services/occurenceType.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OccurenceTypeRouting,
    EffectsModule.run(OccurenceTypeEffects)
  ],
  declarations: [
    OccurenceTypeComponent
  ],
  providers:[OccurenceTypeService]
})
export default class OccurenceTypeModule { }
