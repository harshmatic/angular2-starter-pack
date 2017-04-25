import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-form-group',
  template: `
    <div
        [attr.data-testid]="testid"
        class="py2">
      <ng-content></ng-content>
    </div>
  `
})
export class EsplFormGroupComponent {
  @Input() testid: string;
};
