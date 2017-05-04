import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import { Router,ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  moduleId:module.id,
  selector: 'app-espl-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class EsplLoginFormComponent implements OnInit {

  // needed to be public to allow access from fixture tests
  username: FormControl;
  password: FormControl;
  authForm: FormGroup;
  queryUrl:'';
  constructor(private _router: Router,
          private builder: FormBuilder,
          private route: ActivatedRoute,
          private authService: AuthService ) {
    this.reset();
  }
  ngOnInit(){
    if (this.authService.isAuthenticated) {
        this._router.navigate(['/dashboard']);
    }
    this.route.queryParams.subscribe(params => {
                 if(params['url']) {
                    this.queryUrl=params['url'];
                 }
      } );
  }
  handleSubmit() {
      this.authService.login({userName:this.username.value,password:this.password.value}).subscribe(
          results => {
            this.getLoggedInUserPermission();
          });
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
               if(this.queryUrl) {
                    this._router.navigate([this.queryUrl]);
                } else {
                  this._router.navigate(['/dashboard']);
                }
            });
    };
  reset() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.authForm = this.builder.group({
      username: this.username,
      password: this.password
    });
  }
};
