import {Component} from '@angular/core';


@Component({
  selector: 'espl-modalRender',
  template: `
  <div (click)="onContainerClicked($event)" class="modal fade in" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': 1 }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ng-content select=".espl-modalRender-header"></ng-content>
        </div>
        <div class="modal-body">
          <ng-content select=".espl-modalRender-body"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select=".espl-modalRender-footer"></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .modalRender {
      background: rgba(0,0,0,0.6);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
  `]
})
export class ModalComponent {

  public visible = false;
  private visibleAnimate = false;

  constructor(){}

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
