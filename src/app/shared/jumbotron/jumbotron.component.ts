import { Component, Input } from '@angular/core';

@Component({
  selector: 'espl-jumbotron',
  template: `<div class="jumbotron">
            <div class="container">
            <ng-content></ng-content>
             </div>
            </div> `
})
export class EsplJumbotronComponent {
  //@Input() qaid: string;
  @Input() className: string;
};
