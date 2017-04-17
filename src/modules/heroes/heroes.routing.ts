import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, NotFoundPage } from '../../app/core';
import { CanDeactivateGuard, SelectivePreloadingStrategy } from '../../app/shared';
import { HeroesPage } from './heroes.page';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';


const routes: Routes = [
  {
    path: '',
    component: HeroesPage,
    children: [
      {
        path: 'admin',
        loadChildren: 'modules/heroes/admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'crisis-center',
        loadChildren: 'modules/heroes/crisis-center/crisis-center.module#CrisisCenterModule',
        data: { preload: true },
        canLoad: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: 'modules/heroes/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'hero/:id', component: HeroDetailComponent,
        canLoad: [AuthGuard]
      },
      { path: 'list', loadChildren: 'modules/heroes/hero/hero.module#HeroModule' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class HeroesRouting { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/