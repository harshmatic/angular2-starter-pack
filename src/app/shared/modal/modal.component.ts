import { Component } from '@angular/core';

import { ModalComponent} from '../modal/modalRender.component';
@Component({
  selector: 'espl-modal',
  template: `
   <button type="button" (click)="modal1.show()">test</button>
  <espl-modalRender #modal1>
    <div class="espl-modalRender-header">
      header
    </div>
    <div class="espl-modalRender-body">
      Whatever content you like, form fields, anything
      <input type="text">
    </div>
    <div class="espl-modalRender-footer">
      <button type="button" class="btn btn-default" (click)="modal1.hide()">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </espl-modalRender>
  `
})
export class EsplModalComponent {
  
};
