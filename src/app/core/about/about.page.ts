import { Component } from '@angular/core';
import { EsplContainerComponent } from '../../shared/container/container.component';

@Component({
  selector: 'espl-about-page',
  template: `
    <espl-container [size]=4 [center]=true>
      <h2 class="caps">About Us</h2>
      <p>
        This is a big demo app made from vaesplus small demos plus a feature I
        made to answer objections to Bernie Sanders. I made it because I could 
        only find small, instructional demo apps which didn't help me to see how
        to make large ones. Being unemployed it wasn't possible for me to see
        how big apps are made.
      </p>
      <p><a href="https://github.com/dancancro/great-big-angular2-example">Source Code</a></p>
    </espl-container>
    <twain-quote></twain-quote>
  `
})
export class EsplAboutPage { }
