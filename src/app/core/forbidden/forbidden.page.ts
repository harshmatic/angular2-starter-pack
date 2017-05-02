import { Component } from '@angular/core';
import { EsplContainerComponent } from '../../shared/container/container.component';

@Component({
  selector: 'espl-forbidden-page',
  template: `
    <espl-container [size]=4 [center]=true>
      <h2 class="caps">Unauthorized Access</h2>
      <h4>
        You don't have access to this page.
      </h4>
    </espl-container>
    <button class="btn btn-warning btn-lg">Go Home</button>
    <twain-quote></twain-quote>
  `
})
export class EsplForbiddenPage { }
