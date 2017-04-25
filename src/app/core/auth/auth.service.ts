import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BaseService } from '../services/index';
import { Subject } from 'rxjs/Subject';

//CONFIGESPL
import {ApiBaseAuthUrl} from '../../../modules/config';

const CONTEXT = ApiBaseAuthUrl;
@Injectable()
export class AuthService extends BaseService {
  isLoggedIn: boolean = false;
  authStatusChangeSource = new Subject<string>();
  onAuthStatusChanged$ = this.authStatusChangeSource.asObservable();
  constructor(public http: Http) {
        super(http,CONTEXT);
  }

  login(credentials) {
    return this.post$(ApiBaseAuthUrl,JSON.stringify(credentials)).map(res => {
       this.setToken(res);
       this.isLoggedIn = true;
    });
  }

  isAuthenticated() {
    if (localStorage.getItem('accessToken')) {
        this.isLoggedIn = true;
        this.authStatusChangeSource.next('true');
        return true;
    } else {
        this.isLoggedIn = false;
        this.authStatusChangeSource.next('false');
        return false;
    }
  }

  logout() {
        localStorage.clear();
        this.isLoggedIn = false;
        this.authStatusChangeSource.next('false');
  }

  private setToken(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('accessToken', body.token);
        this.isLoggedIn = true;
    }
}
