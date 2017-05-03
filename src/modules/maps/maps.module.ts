import { ElementRef,Component, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MapsRouting} from './maps.routing';
import {Maps} from './maps.component';
import { SharedModule } from '../../app/shared/shared.module';
import { AgmCoreModule  } from '@agm/core'

@NgModule({
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    MapsRouting,
    SharedModule,
    AgmCoreModule

  ],
  declarations: [ Maps ],
  bootstrap: [ Maps ]
})
export default class MapsModule { }

