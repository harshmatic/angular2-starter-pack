import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OccurenceReviewHistoryRouting } from './occurenceReviewHistory.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OccurenceReviewHistoryComponent } from './components/orh.component';
import { OccurenceReviewHistoryEffects } from './store/occurenceReviewHistory.effects';
import { OccurenceReviewHistoryService } from './services/occurenceReviewHistory.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OccurenceReviewHistoryRouting,
    EffectsModule.run(OccurenceReviewHistoryEffects)
  ],
  declarations: [
    OccurenceReviewHistoryComponent
  ],
  providers:[OccurenceReviewHistoryService]
})
export default class OccurenceReviewHistoryModule { }
