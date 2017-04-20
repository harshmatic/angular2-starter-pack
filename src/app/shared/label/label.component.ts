import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-label',
  template: `
    <label [id]="qaid">
      <ng-content></ng-content>
    </label>
  `
})
export class EsplLabelComponent {
  @Input() qaid: string;
};
