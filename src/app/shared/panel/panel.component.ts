import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'espl-panel',
  template: `

    <div 
    [id]="qaid"
    [attr.data-testid]="testid"
    class="panel panel-primary ||panel {{className}}">
         <div class="panel-body"><ng-content></ng-content></div>
    </div>`

   
})
export class EsplPanelComponent {
  @Input() className: string;
 // @Input() classNameDiv: string;
  @Input() qaid: string;
  @Input() testid: string;
};
