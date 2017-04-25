import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { NavItemComponent } from './nav-item.component';
import { SidenavComponent } from './sidenav.component';
import { ToolbarComponent } from './toolbar.component';


export const bcNavComponents = [
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: bcNavComponents,
  exports: bcNavComponents
})
export class NavigatorModule { }
