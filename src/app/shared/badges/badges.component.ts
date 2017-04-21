import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-badges',
  template: `
    <ng-content></ng-content> 
        <span class="badge"><ng-content></ng-content></span>`
})
export class EsplBadgesComponent {
  @Input() class: string;
};
