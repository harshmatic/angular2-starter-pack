import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Maps } from './maps.component';
import { AuthGuard } from '../../app/core/index'

const routes: Routes = [
  {
    path: '',
    component: Maps,
    data: {
    },
     canActivate: [AuthGuard],
  }
];

export const routedComponents = [Maps];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRouting { }