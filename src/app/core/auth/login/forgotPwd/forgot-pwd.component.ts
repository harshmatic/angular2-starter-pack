import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../../app/core/services/index';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'forgot-pwd',
    templateUrl: 'forgot-pwd.component.html',
    styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

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
        // if (this.authService.isAuthenticated) {
        //   this._router.navigate(['/dashboard']);
        // }
        // this.route.queryParams.subscribe(params => {
        //   if (params['url']) {
        //     this.queryUrl = params['url'];
        //   }
        // });
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
    back(){
        this._router.navigate(['/login']);
    }
};
