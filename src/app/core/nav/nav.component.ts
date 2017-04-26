import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'espl-nav',
  templateUrl: 'nav.component.html',
  styles: []
})
export class NavComponent implements OnInit, OnDestroy {
  isLoggedIn:boolean = false;
  loggedInSubscription:any
  constructor(private _router: Router, private authService: AuthService ) {
  }
  ngOnInit() {
   this.isLoggedIn = this.authService.isAuthenticated();
   this.loggedInSubscription = this.authService.onAuthStatusChanged$.subscribe((value:any) => {
      this.isLoggedIn = value;
   })
  }
  onLogout() {
    this.authService.logout();
    this._router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
