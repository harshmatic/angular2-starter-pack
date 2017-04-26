import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BaseService } from '../services/index';

//CONFIGESPL
import {ApiBaseAuthUrl} from '../../../modules/config';

const CONTEXT = ApiBaseAuthUrl;
@Injectable()
export class AuthService extends BaseService {
  isLoggedIn: boolean = false;
  onLoggedInChange: EventEmitter<any> = new EventEmitter<any>();
   
  constructor(public http: Http) {
        super(http,CONTEXT);
  }

  login(credentials) {
    debugger;
    return this.post$(ApiBaseAuthUrl,JSON.stringify(credentials)).map(res => {
         debugger;
       this.setToken(res);
       this.isLoggedIn = true;
    });
  }
  onAuthStatusChanged$ () {
    return this.onLoggedInChange;
  }
  isAuthenticated() {
    if (localStorage.getItem('accessToken')) {
        this.isLoggedIn = true;
         this.onLoggedInChange.emit(true)
        return true;
    } else {
        this.isLoggedIn = false;
         this.onLoggedInChange.emit(false)
        return false;
    }
  }

  logout() {
        localStorage.clear();
        this.isLoggedIn = false;
        this.onLoggedInChange.emit(false)
        
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
