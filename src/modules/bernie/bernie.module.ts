import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SortablejsModule } from 'angular-sortablejs';
import { AsyncPipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { BerniePage } from './bernie.page';
import { ClaimComponent } from './claim/claim.component';
import { RebuttalComponent } from './rebuttal/rebuttal.component';
import { DataService } from '../../app/core';
import { SharedModule } from '../../app/shared';
import { BernieRouting } from './bernie.routing';
import { ClaimEffects, RebuttalEffects, ClaimRebuttalEffects } from '../../app/core';

@NgModule({
  imports: [
    SortablejsModule,
    SharedModule,
    BernieRouting,
    ReactiveFormsModule,
    EffectsModule.run(ClaimEffects),
    EffectsModule.run(RebuttalEffects),
    EffectsModule.run(ClaimRebuttalEffects)
  ],
  declarations: [
    BerniePage,
    ClaimComponent,
    RebuttalComponent
  ],
  providers: [
    DataService
  ]
})
export class BernieModule { }
