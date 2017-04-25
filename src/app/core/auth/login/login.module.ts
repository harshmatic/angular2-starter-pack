import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { EsplLoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { LoginRouting } from './login.routing';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRouting
  ],
  declarations: [
    EsplLoginFormComponent
  ],
  exports: [
  ],
  providers:[]
})
export class LoginModule { }
