import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../../app/core/services/index';
import { CheckboxModule } from 'primeng/primeng';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-espl-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class EsplLoginFormComponent implements OnInit {
  //getting data from login-page.ts
  @Input() Logo: any;
  @Input() mainCSS: any;
  @Input() authenticationType: any;
  // needed to be public to allow access from fixture tests
  checked: boolean = false;
  username: FormControl;
  password: FormControl;
  remember: FormControl;
  authForm: FormGroup;
  queryUrl:string= '';
  constructor(private _router: Router,
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService) {
    this.reset();
  }
  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this._router.navigate(['/dashboard']);
    }
    this.route.queryParams.subscribe(params => {
      if (params['url']) {
        this.queryUrl = params['url'];
      }
    });
  }
  handleSubmit() {
    //If Input parameter is tokenBase 
    if (this.authenticationType === 'tokenBase') {
      if (this.username.value !== '' && this.password.value !== '') {
        this.authService.login({ userName: this.username.value, password: this.password.value }).subscribe(
          results => {
            this.getLoggedInUserPermission();
          });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Invalid login', detail: 'Enter Username and Password' });
      }
    }
    //If input parameter is OAuth
    if (this.authenticationType === 'OAuth') {
      if (this.username.value !== '' && this.password.value !== '') {
        this.authService.oAuth({ userName: this.username.value, password: this.password.value }).subscribe(
          results => {
            this.getLoggedInUserPermission();
          });
      } else {
        this.messageService.addMessage({ severity: 'error', summary: 'Invalid login', detail: 'Enter Username and Password' });
      }
    }
    //If Input parameter is simple
    if (this.authenticationType === 'simple') {
      if (this.username.value !== '' && this.password.value !== '') {
        this.authService.simpleLogin({ userName: this.username.value, password: this.password.value }).subscribe(
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
  reset() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.remember = new FormControl('');
    this.authForm = this.builder.group({
      username: this.username,
      password: this.password,
      remember: this.remember
    });
  }
};
