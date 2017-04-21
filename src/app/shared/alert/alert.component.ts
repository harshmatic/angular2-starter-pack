import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-alert',
  template: `
    <div
      [id]="qaid"
      class="p2 bold"
      [attr.data-testid]="testid"
      [ngClass]="{
        'alert-info': status === 'info',
        'alert-warning': status === 'warning',
        'alert-success': status === 'success',
        'alert-danger': status === 'error'
      }">
      <ng-content></ng-content>
    </div>
  `
})
export class EsplAlertComponent {
  @Input() status = 'info';
  @Input() qaid: string;
  @Input() testid: string;
};
