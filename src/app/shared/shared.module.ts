// From Style guide item 4-10
// https://angular.io/docs/ts/latest/guide/style-guide.html#04-10

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonComponent} from '../shared/buttonComponent/button.component';
import {EsplLabelComponent} from '../shared/label/label.component';
import {EsplAlertComponent} from '../shared/alert/alert.component';
import {EsplFormGroupComponent} from '../shared/form-group/form-group.component';
export const components = [
    ButtonComponent,
    EsplLabelComponent,
    EsplAlertComponent,
    EsplFormGroupComponent
   
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...components
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...components
  ],
  providers: [
  ]
})
export class SharedModule { }