import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers,Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BaseService } from '../services/index';
import { Router } from '@angular/router';
import { MessageService } from '../services/index';

//CONFIGESPL
import {ApiBaseAuthUrl} from '../../../modules/config';

const CONTEXT = ApiBaseAuthUrl;
@Injectable()
export class AuthService extends BaseService {
  isLoggedIn: boolean = false;
  onLoggedInChange: EventEmitter<any> = new EventEmitter<any>();
   
  constructor(public http: Http, router: Router, messageService: MessageService) {
        super(http,CONTEXT,router, messageService);
  }

  login(credentials) {
    return this.post$(ApiBaseAuthUrl,JSON.stringify(credentials)).map(res => {
       this.setToken(res);
       this.isLoggedIn = true;
    }).catch(err => {
                return Observable.throw(err);;
    });
  }
  getLoggedInUserPermission() {
    return this.get$('permissions',true).map((res:any)=>{
          this.setLoggedInUserPermission(res)
    })
  }
  getCurrentUserDetails() {
    return this.get$('profile',true).map((res:any)=>{
          this.setLoggedInUserDetail(res)
    })
  }
 getCurrentUser() {
        return JSON.parse(localStorage.getItem('loggedInUserDetails'));
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
  private setLoggedInUserPermission(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserPermission', JSON.stringify(body));
  }
  private setLoggedInUserDetail(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        localStorage.setItem('loggedInUserDetails', JSON.stringify(body));
    }
}
