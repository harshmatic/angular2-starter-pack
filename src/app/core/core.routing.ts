import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { EsplAboutPage } from './about/about.page';
import { NotFoundPage } from './not-found/not-found.page';

const routes: Routes = [
      { path: 'about', component: EsplAboutPage },
      { path: 'not-found', component: NotFoundPage }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
