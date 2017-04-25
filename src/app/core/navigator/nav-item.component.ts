import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bc-nav-item',
  template: `
    <a link="routerLink" (click)="activate.emit()">
      <span><ng-content></ng-content></span>
      <span class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [`
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `]
})
export class NavItemComponent {
  @Input() icon: string = '';
  @Input() hint: string = '';
  @Input() routerLink: string | any[] = '/';
  @Output() activate = new EventEmitter();
}
