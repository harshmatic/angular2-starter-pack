import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartmentRouting } from './department.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { DepartmentComponent } from './components/department.component';
import { DepartmentEffects } from './store/department.effects';
import { DepartmentService } from './services/department.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DepartmentRouting,
    EffectsModule.run(DepartmentEffects)
  ],
  declarations: [
    DepartmentComponent
  ],
  providers:[DepartmentService]
})
export class DepartmentModule { }
