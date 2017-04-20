import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
//import { LoginModule } from './core/auth/login/login.module';
/** TODO: remove when work-around is not needed*/
import 'hammerjs';

/* App Root */
import { AppPage } from './app.page';
//import { EsplLoginModalComponent } from './core/auth/login/login-modal/login-modal.component';
//import { LoginModule } from './core/auth/login/login.module';
//import { SharedModule } from './shared/shared.module';
import { AppRouting } from './app.routing';

/* Feature Modules */
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRouting,
    //LoginModule,
   // SharedModule
  ],
  declarations: [
    AppPage
  ],
  bootstrap: [
    AppPage
  ]
})
export class AppModule { }
