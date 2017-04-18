import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { EsplLoginFormComponent } from './login-form/login-form.component';
import { EsplLoginModalComponent } from './login-modal/login-modal.component';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { SessionEffects } from '../../../core/store/session/session.effects';
import { DataService } from '../../../core/services/data.service';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    EffectsModule.run(SessionEffects),
    LoginRouting
  ],
  declarations: [
    EsplLoginModalComponent,
    EsplLoginFormComponent,
    LoginComponent
  ],
  exports: [
    EsplLoginModalComponent
  ],
  providers: [
    DataService
  ]
})
export class LoginModule { }
