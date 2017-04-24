import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OccurenceBookRouting } from './occurenceBook.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { OccurenceBookComponent } from './components/ob.component';
import { OccurenceBookEffects } from './store/occurenceBook.effects';
import { OccurenceBookService } from './services/occurenceBook.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    OccurenceBookRouting,
    EffectsModule.run(OccurenceBookEffects)
  ],
  declarations: [
    OccurenceBookComponent
  ],
  providers:[OccurenceBookService]
})
export default class OccurenceBookModule { }
