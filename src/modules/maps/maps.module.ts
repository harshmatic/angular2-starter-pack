import { ElementRef,Component, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {MapsRouting} from './maps.routing';
import {Maps} from './maps.component';
import { SharedModule } from '../../app/shared/shared.module';

@NgModule({
  imports: [ 
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDM1MmeR32nGYx5Q90r26hVNpzPgBxTZdw",
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
    MapsRouting

  ],
  declarations: [ Maps ],
  bootstrap: [ Maps ]
})
export default class MapsModule { }

