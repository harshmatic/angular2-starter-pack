import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from 'primeng/primeng';
import { MessageService } from './core/services/index';
import { NavComponent } from './core/nav/nav.component';
import { AuthService } from '../app/core/auth/auth.service';
import * as fromRoot from './core/store/';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.page.css'],
    templateUrl: './app.page.html'
})
export class AppPage implements OnInit {
    //Passing data to nav controller
    public navMenu: any = [{ 'Name': 'Dashboard', 'Routerlink': '/dashboard', 'Authorize': [] },
    { 'Name': 'Occurrence Book', 'Routerlink': '/ob/occurenceDetails', 'Authorize': ['OB.R'] },
    { 'Name': 'Officer Management', 'Routerlink': '/employee/officerList', 'Authorize': ['EP.R'] },
    { 'Name': 'Inventory', 'Routerlink': '#', 'Authorize': [] },
    { 'Name': 'Reports', 'Routerlink': '/reports', 'Authorize': [] }];
    public cssClass: any = 'mainCSS';
    msgs: Message[] = [];
    userDetail: any;
    isLoggedIn: boolean = false;
    loggedInSubscription: any;
    constructor(private store: Store<fromRoot.RootState>, private messageService: MessageService, private authService: AuthService) {

    }
    ngOnInit() {
        this.isLoggedIn = this.authService.isAuthenticated();
        this.messageService.getMessages()
            .subscribe((value: Object) => {
                this.msgs = [];
                this.msgs.push(value);
            });
        this.loggedInSubscription = this.authService.onAuthStatusChanged$()
            .subscribe((value: any) => {
                this.isLoggedIn = value;
                this.getUser();
            })
        this.getUser();
    }
    getUser() {
        if (this.isLoggedIn) {
            this.userDetail = this.authService.getCurrentUser();
        }
    }
}
