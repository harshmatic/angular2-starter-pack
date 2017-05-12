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
  @Output() doLogin: EventEmitter<any> = new EventEmitter();
  // needed to be public to allow access from fixture tests
  checked: boolean = false;
  username: FormControl;
  password: FormControl;
  remember: FormControl;
  authForm: FormGroup;
  queryUrl: '';
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
  handleSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.doLogin.emit(value);
  }
  reset() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.remember = new FormControl('', Validators.required);
    this.authForm = this.builder.group({
      username: this.username,
      password: this.password,
      remember: this.remember
    });
  }
};
