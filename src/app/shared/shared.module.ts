// From Style guide item 4-10
// https://angular.io/docs/ts/latest/guide/style-guide.html#04-10

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Draggable } from './draggable/draggable.directive';
import { EsplAlertComponent } from './alert/alert.component';
import { EsplButtonComponent } from './button/button.component';
import { EsplContainerComponent } from './container/container.component';
import { EsplInputComponent } from './input/input.component';
import { EsplFormComponent } from './form/form.component';
import { EsplFormErrorComponent } from './form-error/form-error.component';
import { EsplFormGroupComponent } from './form-group/form-group.component';
import { EsplLabelComponent } from './label/label.component';
import { EsplModalComponent } from './modal/modal.component';
import { EsplModalContentComponent } from './modal-content/modal-content.component';
import { AwesomePipe } from './awesome/awesome.pipe';
import { HighlightDirective } from './highlight/highlight.directive';
import { TitleCasePipe } from './title-case/title-case.pipe';
import { TwainComponent } from './twain/twain.component';
import { TwainService } from './twain/twain.service';
import { BannerComponent } from './banner/banner.component';
//import { WelcomeComponent } from './welcome/welcome.component';
import { IfAuthorizeDirective } from './directives/ifAuthorize.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export const components = [
  Draggable,
  EsplAlertComponent,
  EsplButtonComponent,
  EsplContainerComponent,
  EsplInputComponent,
  EsplFormComponent,
  EsplFormErrorComponent,
  EsplFormGroupComponent,
  EsplLabelComponent,
  EsplModalComponent,
  EsplModalContentComponent,
  AwesomePipe,
  HighlightDirective,
  TitleCasePipe,
  TwainComponent,
  BannerComponent,
  IfAuthorizeDirective,
 // WelcomeComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    ...components
  ],
  providers: [
    TwainService
  ]
})
export class SharedModule { }
