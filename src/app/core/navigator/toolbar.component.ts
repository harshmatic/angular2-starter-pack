import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bc-toolbar',
  template: `
    <div>
      <button (click)="openMenu.emit()">
        
      </button>
      <ng-content></ng-content>
    </div>
  `
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
