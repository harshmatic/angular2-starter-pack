import {Component, Input} from '@angular/core';

@Component({
  selector: 'espl-input',
  template: `
    <div class="input-group">
      <input
       [type]="inputType"
       [id]="qaid"
       class="form-control"
       [placeholder]="placeholder">
    </div>
    
  `,
  
})
export class InputComponent {
  @Input() inputType = 'text';
  @Input() qaid: string;
  @Input() placeholder = 'Enter Name';
  
}
