import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'espl-counter',
  template: `
    <div class="flex">
      <espl-button
        className="bg-black col-2"
        (onClick)="decrement.emit()"
        testid="counter-decrementButton">
        -
      </espl-button>

      <div 
        data-testid="counter-result"
        class="flex-auto flex-center center h1">
        {{ value }}
      </div>

      <espl-button className="col-2"
        (onClick)="increment.emit()"
        testid="counter-incrementButton">
        +
      </espl-button>
    </div>
  `
})
export class EsplCounterComponent {
  /**
   * Presentational components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() value: number;
  @Output() increment = new EventEmitter();
  @Output() decrement = new EventEmitter();
}
