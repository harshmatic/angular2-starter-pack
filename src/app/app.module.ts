import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginModule } from './core/auth/login/login.module';
/** TODO: remove when work-around is not needed*/
import 'hammerjs';

/* App Root */
import { AppPage } from './app.page';
import { APP_BASE_HREF, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AppRouting } from './app.routing';

/* Feature Modules */
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRouting,
    LoginModule,
    SharedModule
  ],
  declarations: [
    AppPage
  ],
  bootstrap: [
    AppPage
  ],
  providers:[
     Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
   
  ]
})
export class AppModule { }
