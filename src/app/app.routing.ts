import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { CanDeactivateGuard } from './shared/can-deactivate/can-deactivate.guard';
import { SelectivePreloadingStrategy } from './shared/selective-preloading-strategy';
import {routing} from '../modules/config'

const routes: Routes = routing;

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRouting { };

