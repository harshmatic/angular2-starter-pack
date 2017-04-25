import { Component, EventEmitter, Input, Output } from '@angular/core';
import {AuthService} from '../../auth.service';

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
export class EsplLoginFormComponent {

  // needed to be public to allow access from fixture tests
  username: FormControl;
  password: FormControl;
  group: FormGroup;

  constructor(private builder: FormBuilder,private authService: AuthService ) {
    this.reset();
  }

  handleSubmit() {
   this.authService.login({userName:this.username.value,password:this.password.value}).subscribe(
          results => {
                console.log('LoggedIN')
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
