import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { CounterRouting } from './counter.routing';
// import { SharedModule } from '../../app/shared/shared.module';
import { SharedModule } from 'my-demo-pkg-test/src/app/shared/shared.module';
import { EsplCounterComponent } from './counter.component';
import { EsplCounterPage } from './counter.page';
import { CounterEffects } from './store/counter.effects';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CounterRouting,
    EffectsModule.run(CounterEffects)
  ],
  declarations: [
    EsplCounterPage,
    EsplCounterComponent,
  ]
})
export class CounterModule { }
