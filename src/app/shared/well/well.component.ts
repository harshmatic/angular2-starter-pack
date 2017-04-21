import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'espl-well',
  template: `

    <div class="well">
        <ng-content></ng-content>
        </div>`
})
export class EsplWellComponent {
  @Input() className: string;
  @Input() qaid: string;
  @Input() testid: string;
};
