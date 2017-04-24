import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { AreaRouting } from './area.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { AreaComponent } from './components/area.component';
import { AreaEffects } from './store/area.effects';
import { AreaService } from './services/area.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AreaRouting,
    EffectsModule.run(AreaEffects)
  ],
  declarations: [
    AreaComponent
  ],
  providers:[AreaService]
})
export default class AreaModule { }
