import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'espl-login-modal',
  template: `
    <espl-modal>
      <espl-modal-content>
        <h1 class='mt0'>Login</h1>
        <espl-login-form
          [isPending]="isPending"
          [hasError]="hasError"
          (onSubmit)="handleSubmit($event)">
        </espl-login-form>
      </espl-modal-content>
    </espl-modal>
  `
})
export class EsplLoginModalComponent {
  @Input() isPending: boolean;
  @Input() hasError: boolean;
  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();

  handleSubmit(login) {
    this.onSubmit.emit(login);
  }
};
