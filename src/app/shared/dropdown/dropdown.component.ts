import {
  Component,
  Input
} from '@angular/core';




@Component({
  selector: 'espl-dropdown',
  template: `
 
  <div class="dropdown">
    <button class="btn btn-default dropdown-toggle" type="button" id="menu1"  data-toggle="dropdown">Tutorials
    <span class="caret"></span></button>
    <ul class="dropdown-menu"  role="menu" aria-labelledby="menu1" >
      <li *ngFor="let country of countries" [value]="country.name"  #t (click)="selectionChanged(country.name)">{{country.name}}</li>
      
    </ul>
  </div>

  `
})


export class EsplDropdownComponent {
  @Input() ClassName = '';
  @Input() Type= 'button';
  selectedValue="Select";
  countries = [
      { name: "United States"},
      { name: "Australia"},
      { name: "Canada"},
      { name: "Brazil"},
      { name: "England"}
  ];
  
  
selectionChanged(value) {
  debugger;  
    console.log("Changed: " + value);
    
  }
};
