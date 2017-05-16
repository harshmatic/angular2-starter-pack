import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../../app/core/services/index';
import { CheckboxModule } from 'primeng/primeng';
import { EsplLoginFormComponent } from '../login-form/login-form.component';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'login-page',
    templateUrl: 'login-page.component.html'
})
export class LoginPageComponent implements OnInit {

    // passind data to login-form page
    public logoPath = "assets/styles/images/logo.png";
    public mainCSS = 'mainCSS';
    public authenticationType = 'tokenBase';
    queryUrl: '';
    constructor(private _router: Router,
        private builder: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService) {

    }
    ngOnInit() {

    }
    //Reviewed by salauddin
    handleSubmit(evt) {
    //If Input parameter is tokenBase 
    if (this.authenticationType === 'tokenBase') {
      if (evt.username !== '' && evt.password !== '') {
        debugger;
        this.authService.login({ userName: evt.username, password: evt.password }).subscribe(
          results => {
            this.getLoggedInUserPermission();
          });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Invalid login', detail: 'Enter Username and Password' });
      }
    }
    //If input parameter is OAuth
    if (this.authenticationType === 'OAuth') {
      if (evt.username !== '' && evt.password !== '') {
        this.authService.oAuth({ userName: evt.username, password: evt.password }).subscribe(
          results => {
            this.getLoggedInUserPermission();
          });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Invalid login', detail: 'Enter Username and Password' });
      }
    }
    //If Input parameter is simple
    if (this.authenticationType === 'simple') {
      if (evt.username !== '' && evt.password !== '') {
        this.authService.simpleLogin({ userName: evt.username, password: evt.password }).subscribe(
          results => {
            this.getLoggedInUserPermission();
          });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Invalid login', detail: 'Enter Username and Password' });
      }
    }
  }
  getLoggedInUserPermission(): void {
    this.authService.getLoggedInUserPermission()
      .subscribe(
      results => {
        this.getCurrentUserDetails();
      });
  };
  getCurrentUserDetails(): void {
    this.authService.getCurrentUserDetails()
      .subscribe(
      results => {
        if (this.queryUrl) {
          this._router.navigate([this.queryUrl]);
        } else {
          this._router.navigate(['/dashboard']);
        }
      });
  };
};
