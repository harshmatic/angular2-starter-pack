import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { BookAuthorsComponent } from './book-authors/book-authors.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { BookPreviewListComponent } from './book-preview/book-preview-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { AddCommasPipe } from './add-commas/add-commas.pipe';
import { EllipsisPipe } from './ellipsis/ellipsis.pipe';
// import { NavigatorModule } from '../core/navigator/navigator.module';
import { BookExistsGuard } from './book-exists/book-exists.guard';
import { CollectionPage } from './collection.page';
import { FindBookPage } from './find-book.page';
import { SelectedBookPage } from './selected-book.page';
import { ViewBookPage } from './view-book.page';
import { GoogleBooksService, BookEffects, CollectionEffects } from '../../app/core';
import { SharedModule } from '../../app/shared';
import { BooksRouting } from './books.routing';

export const COMPONENTS = [
  BookAuthorsComponent,
  BookDetailComponent,
  BookPreviewComponent,
  BookPreviewListComponent,
  BookSearchComponent,
  AddCommasPipe,
  EllipsisPipe,
  CollectionPage,
  FindBookPage,
  SelectedBookPage,
  ViewBookPage
];


@NgModule({
  imports: [
    SharedModule,
    BooksRouting,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    //    NavigatorModule,
    EffectsModule.run(BookEffects),
    EffectsModule.run(CollectionEffects),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    BookExistsGuard,
    GoogleBooksService
  ],
})
export class BooksModule { }