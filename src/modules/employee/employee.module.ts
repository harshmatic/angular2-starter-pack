import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRouting } from './employee.routing';
// import { SharedModule } from '../../app/shared/shared.module';
import { SharedModule } from 'my-demo-pkg-test/src/app/shared/shared.module';
import { EmployeeComponent } from './components/employee.component';
import { EmployeeEffects } from './store/employee.effects';
import { EmployeeService } from './services/employee.service';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    EmployeeRouting,
    EffectsModule.run(EmployeeEffects)
  ],
  declarations: [
    EmployeeComponent
  ],
  providers:[EmployeeService]
})
export default class EmployeeModule { }
