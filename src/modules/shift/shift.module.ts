import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { ShiftRouting } from './shift.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { ShiftComponent } from './components/shiftList/shift.component';
import { ShiftAddEditComponent } from './components/shiftAddEdit/shiftAddEdit.component';
import { ShiftEffects } from './store/shift.effects';
import { ShiftService } from './services/shift.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ShiftRouting,
    EffectsModule.run(ShiftEffects)
  ],
  declarations: [
    ShiftComponent,
    ShiftAddEditComponent
  ],
  providers:[ShiftService]
})
export class ShiftModule { }
