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
import {EsplInputComponent} from '../shared/input/input.component';
import {EsplLogoComponent} from '../shared/logo/logo.component';
import {EsplModalComponent} from '../shared/modal/modal.component';
import {EsplContainerComponent} from '../shared/container/container.component';
import {EsplPanelComponent} from '../shared/panel/panel.component';
import {EsplFormComponent} from '../shared/form/form.component';
import {EsplFormErrorComponent} from '../shared/form-error/form-error.component'
import {EsplJumbotronComponent} from '../shared/jumbotron/jumbotron.component';
import {EsplWellComponent} from '../shared/well/well.component';
import {EsplBadgesComponent } from '../shared/badges/badges.component';



//import {EsplInputComponent} from '../shared/input/input.component';
//import {EsplLogoComponent} from '../shared/logo/logo.component';
//import {EsplModalComponent} from '../shared/modal/modal.component';
import {ModalComponent} from '../shared/modal/modalRender.component';
//import {EsplContainerComponent} from '../shared/container/container.component';
import {EsplDropdownComponent} from '../shared/dropdown/dropdown.component';

import { EsplPageheaderComponent} from '../shared/pageheader/pageheader.component';




export const components = [
    ButtonComponent,
    EsplLabelComponent,
    EsplAlertComponent,
    EsplFormGroupComponent,
    EsplInputComponent,
    EsplLogoComponent,
    EsplModalComponent,
    EsplContainerComponent,
    EsplPanelComponent,
    EsplFormComponent,
    EsplFormErrorComponent,
    EsplJumbotronComponent,
    EsplWellComponent,
    EsplBadgesComponent ,
    EsplDropdownComponent,
    ModalComponent,
    EsplPageheaderComponent
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