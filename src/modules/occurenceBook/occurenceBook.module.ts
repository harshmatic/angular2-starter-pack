import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRouting } from './occurenceBook.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { EmployeeComponent } from './components/employee.component';
import { OccurenceBookEffects } from './store/occurenceBook.effects';
import { OccurenceBookService } from './services/occurenceBook.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    EmployeeRouting,
    EffectsModule.run(OccurenceBookEffects)
  ],
  declarations: [
    EmployeeComponent
  ],
  providers:[OccurenceBookService]
})
export default class EmployeeModule { }
