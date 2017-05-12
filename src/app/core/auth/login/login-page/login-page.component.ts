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
    constructor(private _router: Router,
        private builder: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private messageService: MessageService) {

    }
    ngOnInit() {

    }

};
