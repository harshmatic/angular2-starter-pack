import { Component } from '@angular/core';


@Component({
  selector: 'bc-layout',
  template: `
    <div>

      <ng-content></ng-content>

    </div>
  `,
  styles: []
})
export class LayoutComponent { }