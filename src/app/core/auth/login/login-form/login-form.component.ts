import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import { Router } from '@angular/router';

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
  group: FormGroup;

  constructor(private _router: Router,private builder: FormBuilder,private authService: AuthService ) {
    this.reset();
  }
  ngOnInit(){
    if (this.authService.isAuthenticated) {
        this._router.navigate(['/dashboard']);
    }
  }
  handleSubmit() {
    debugger;
this.authService.login({userName:this.username.value,password:this.password.value}).subscribe(
          results => {
                // var b = JSON.parse('LoggedIN');
              this._router.navigate(['/dashboard']);
          });
  }

  reset() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.group = this.builder.group({
      username: this.username,
      password: this.password
    });
  }
};
