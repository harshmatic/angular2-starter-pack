import { Component, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
declare var $:any;
@Component({
moduleId:module.id,
  selector: 'espl-nav',
  templateUrl: 'nav.component.html',
  styles: []
})
export class NavComponent {
  color:boolean = true;
  // setBg(e) {
  //   console.log(e.target.attributes['aria-expanded'].value);
  //   console.log(e.target);
  // }
  ngAfterViewInit(){
           $(document).ready(function(){
              $(".navbar-toggle").on("click", function() {
                $(".navbar-header").toggleClass('toggleNavColor');
                $(".icon-bar").toggleClass('whiteIconBar');
            });
           });
     }

}
