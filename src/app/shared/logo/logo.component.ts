import { Component } from '@angular/core';

@Component({
  selector: 'espl-logo',
  styleUrls: ['./logo.component.css'],
  template: `
    <div className="flex items-center">
      <img
        class="logo"
        [src]="LogoImage"
        alt="Bernie Rebuttals"
      />
    </div>
  `
})
export class EsplLogoComponent {
  private LogoImage = require('../../../assets/bernie-sanders-128.jpg');
};
