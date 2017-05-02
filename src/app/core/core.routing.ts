import { ModuleWithProviders } from '@angular/core';
import { Routes,
         RouterModule }        from '@angular/router';

import { EsplForbiddenPage } from './forbidden/forbidden.page';
import { NotFoundPage } from './not-found/not-found.page';

const routes: Routes = [
      { path: 'forbidden', component: EsplForbiddenPage },
      { path: 'not-found', component: NotFoundPage }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
