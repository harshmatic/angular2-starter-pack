import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BaseService } from '../services/index';

const CONTEXT='token/auth'
@Injectable()
export class AuthService extends BaseService {
  isLoggedIn: boolean = false;

  constructor(public http: Http) {
        super(http,CONTEXT);
    }

  redirectUrl: string;

  login(credentials) {
    return this.post$(JSON.stringify(credentials)).map(res => {
       this.setToken(res);
       this.isLoggedIn = true;
    });
  }

  logout(): void {
    this.isLoggedIn = false;
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
