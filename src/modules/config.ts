import { RouterModule, Routes } from '@angular/router';

export const routing = [

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

export const apiBase = "/api";

