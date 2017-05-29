import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';
import { MessageService } from './message.service';

const CONTEXT = '';
@Injectable()
export class EtagService extends BaseService {
  constructor(public http: Http, router: Router,messageService: MessageService,private _cacheService: CacheService) {
     super(http,CONTEXT,router,messageService);
  }

  getListWithEtag(url:string,cacheName:string) {
    if (this._cacheService.exists(cacheName)) {
            let cacheData:any= this._cacheService.get(cacheName)
             return this.getList$(url,0,0,true,cacheData.etag)
                .map(res => {
                    this._cacheService.set(cacheName,{etag:res.headers.get('etag'), data:res.json()}, { maxAge: 60 * 60*60 });
                    return res;
                })
                 .catch(err=> {
                     if (err.status==304) {
                         err.cacheData=cacheData.data
                        return Observable.of(err);
                     }else {
                         return err;
                     }
                }); 
        } else {
            return this.getList$(url,0,0,true)
                .map(res => {
                    this._cacheService.set(cacheName,{etag:res.headers.get('etag'), data:res.json()}, { maxAge: 60 * 60 });
                    return res;
                })   
        }
  }
}
