import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { CanDeactivateGuard } from './shared/can-deactivate/can-deactivate.guard';
import { SelectivePreloadingStrategy } from './shared/selective-preloading-strategy';

const routes: Routes = [
  { path: 'bernie', loadChildren: 'modules/bernie/bernie.module#BernieModule' },
  { path: 'books', loadChildren: 'modules/books/books.module#BooksModule' },
  { path: 'contacts', loadChildren: 'modules/contact/contact.module#ContactModule' },
  { path: 'counter', loadChildren: 'modules/counter/counter.module#CounterModule' },
  { path: 'heroes', loadChildren: 'modules/heroes/heroes.module#HeroesModule' },
  { path: 'notes', loadChildren: 'modules/notes/notes.module#NotesModule' },
  { path: 'wiki', loadChildren: 'modules/wiki/wiki.module#WikiModule' },
  { path: '', redirectTo: 'core', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

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


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
