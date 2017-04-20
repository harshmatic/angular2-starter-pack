import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { EsplAboutPage } from './about/about.page';
import { TestComponent } from './TestComponents/test.page';
import { NotFoundPage } from './not-found/not-found.page';

const routes: Routes = [
      { path: '', redirectTo: 'about', pathMatch: 'full'},
      { path: 'about', component: EsplAboutPage },
      { path: 'not-found', component: NotFoundPage },
      { path: 'test', component: TestComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
