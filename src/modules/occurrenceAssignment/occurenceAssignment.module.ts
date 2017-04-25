import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OccurenceAssignmentRouting } from './occurenceAssignment.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OccurenceAssignmentComponent } from './components/oa.component';
import { OccurenceAssignmentEffects } from './store/occurenceAssignment.effects';
import { OccurenceAssignmentService } from './services/occurenceAssignment.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OccurenceAssignmentRouting,
    EffectsModule.run(OccurenceAssignmentEffects)
  ],
  declarations: [
    OccurenceAssignmentComponent
  ],
  providers:[OccurenceAssignmentService]
})
export default class OccurenceBookModule { }
