
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'espl-nav',
  templateUrl: 'nav.component.html',
  styles: []
})
export class NavComponent implements OnInit, OnDestroy {
  userDetail:any;
  isLoggedIn:boolean = false;
  loggedInSubscription:any
  constructor(private _router: Router, private authService: AuthService ) {
  }
  ngOnInit() {
   this.isLoggedIn = this.authService.isAuthenticated();
   this.loggedInSubscription = this.authService.onAuthStatusChanged$()
      .subscribe((value:any) => {
         this.isLoggedIn = value;
         this.getUser();
       })
   this.getUser();   
  }
  getUser(){
    if(this.isLoggedIn){
        this.userDetail = this.authService.getCurrentUser();
    }
  }
  onLogout() {
    this.authService.logout();
    this._router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
  ngAfterViewInit(){
           $(document).ready(function(){
              $(".navbar-toggle").on("click", function() {
                $(".navbar-header").toggleClass('toggleNavColor');
                $(".icon-bar").toggleClass('whiteIconBar');
            });
            // $("#myNavbar ul li").on("click", function() {
            //   $(".navbar-toggle").click();
                
            // });
            $(document).on('click','.navbar-collapse.in',function(e) {
                 if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                 $(this).collapse('hide');
               }
            });
           });
     }
}
