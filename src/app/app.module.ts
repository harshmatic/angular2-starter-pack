import { NgModule,ErrorHandler } from '@angular/core';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginModule } from './core/auth/login/login.module';
import { GlobalErrorHandler } from './core/services/exception.service';

/** TODO: remove when work-around is not needed*/
import 'hammerjs';

/* App Root */
import { AppPage } from './app.page';
import { APP_BASE_HREF, HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AppRouting } from './app.routing';
import { AgmCoreModule  } from '@agm/core';
/* Feature Modules */
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    AppRouting,
    LoginModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDM1MmeR32nGYx5Q90r26hVNpzPgBxTZdw",
      libraries: ["places"]
    })
    
  ],
  declarations: [
    AppPage
  ],
  bootstrap: [
    AppPage
  ],
  exports:[

    AgmCoreModule
  ],
  providers:[ { provide: ErrorHandler, useClass: GlobalErrorHandler },
     Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
    
   
  ]
})
export class AppModule { }
