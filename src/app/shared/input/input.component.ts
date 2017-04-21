import {
  Component,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'espl-input',
  template: `
  <div class="col-lg-2">
    <input
      [id]="qaid"
      [type]="inputType"
      class="form-control"
      [placeholder]="placeholder"
      [formControl]="control"
      aria-describedby="basic-addon1"
    />
    <div>
  `
})
export class EsplInputComponent {
  @Input() inputType = 'text';
  @Input() placeholder = '';
  @Input() control: FormControl = new FormControl();
  @Input() qaid: string;
};
