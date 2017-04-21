import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-label',
  template: `
    <label [id]="qaid"
       class="label label-primary || label {{className}}">
      <ng-content></ng-content>
    </label>
  `
})
export class EsplLabelComponent {
  @Input() qaid: string;
  @Input() className: string;
};
