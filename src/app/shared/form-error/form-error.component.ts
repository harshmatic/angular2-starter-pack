import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-form-error',
  template: `
    <div
      [id]="qaid"
      [attr.data-testid]="testid"
      class="bold black"
      [ngClass]="{ 'display-none': !visible }">
      <ng-content></ng-content>
    </div>
  `
})
export class EsplFormErrorComponent {
  @Input() visible: boolean;
  @Input() qaid: string;
  @Input() testid: string = 'form-error';
};
