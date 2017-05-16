import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

import { LogService } from './log.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
//CONFIGESPL
import {ApiBase} from '../../../modules/config'

/** HttpService interface Definition*/
interface HttpServices {
    get$(url:string, isSecured?: boolean): Observable<Response>;
    getList$(url:string,pageNum?: number, pageSize?: number, isSecured?: boolean): Observable<Response>;
    post$(url:string,payload: any, isSecured?: boolean): Observable<Response>;
    put$(url:string, payload: any, isSecured?: boolean): Observable<Response>;
    delete$(url:string, isSecured?: boolean): Observable<Response>;
}

/** Base Service Definition */
export class BaseService implements HttpServices {

    private baseUrl: string = ApiBase;
    private options: RequestOptions;
    private log:LogService;
    private httpService: Http;
    private requestUrl: string;
    private messageService:MessageService;
    private router:Router;
    /** Base Service constructor : Accepts Analytics Service, Http Service, Context path, Log service */
    constructor(_httpService: Http, _context: string, router?:Router, messageService?: MessageService,log?:LogService) {
        this.httpService = _httpService;
        //this.requestUrl = this.baseUrl.concat(_context);
        this.messageService = messageService;
        this.log = log;
        this.router = router;
    }

    _window(): any {
        return window;
    }

    /**
     * Get Single object using get$ method.
     * @input id :  of the object for which you need a data
     * @input isSecured : Optional Parameter : Parameter to tell base service if security headers needs to be included
     */
    get$(url:string, isSecured?: boolean): any {
        this.getHeaders(isSecured);
        return this.httpService.get(this.baseUrl + url, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
             return err;
        });
    }
    /**
     * Get List of Objects using getList$ method.rl:string,
     * @input pageNum : Optional parameter,
     * @input pageSize : Optional Parameter,
     * @isSecured : Optional Parameter : Parameter to tell base service if security headers nedds to be included
     */
    getList$(url:string,pageNum?: number, pageSize?: number, isSecured?: boolean): Observable<Response> {
        this.getHeaders(isSecured);
        return this.httpService.get(this.baseUrl+url, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            throw new Error("asda");
             //return err;
        });
    }
    /**
     * Get list of child objects using getChildList$
     * @input : childName : string
     * @input pageNum : Optional parameter,
     * @input pageSize : Optional Parameter,
     * @isSecured : Optional Parameter : Parameter to tell base service if security headers nedds to be included
     */
    getChildList$(url:string,childName: string, pageNum?: number, pageSize?: number, isSecured?: boolean) {
        this.getHeaders(isSecured);
        return this.httpService.get(this.baseUrl + '/' + childName, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            //throw new Error('Im errorn');
            return this.handleError(err);
        });

    }

    /**
     * Send data to server using post$ method
     * @input payload : data to be sent,
     * @isSecured : Optional Parameter : Parameter to tell base service if security headers nedds to be included
     */
    post$(url:string,payload: string, isSecured?: boolean): Observable<Response> {
        this.getHeaders(isSecured);
        return this.httpService.post(this.baseUrl+url, payload, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
    /**
    * Send data to server for updating existing object using post$ method
    * @input id : ID of the object to be updated
    * @input payload : data to be sent,
    * @isSecured : Optional Parameter : Parameter to tell base service if security headers nedds to be included
    */
    put$(url:string, payload: any, isSecured?: boolean) {
        this.getHeaders(isSecured);
        return this.httpService.put(this.baseUrl+url, payload, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    patch$(url:string, payload: any, isSecured?: boolean) {
        this.getHeaders(isSecured);
        return this.httpService.patch(this.baseUrl+url, payload, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }
    /**
     * Delete Object from server using delete$ method
     * @input id : ID of the object to be deleted
     * @isSecured : Optional Parameter : Parameter to tell base service if security headers nedds to be included
     */
    delete$(url:string, isSecured?: boolean) {
        this.getHeaders(isSecured);
        return this.httpService.delete(this.baseUrl + url, this.options)
        .map(data => {
            return data;
        })
        .catch(err => {
            return this.handleError(err);
        });
    }

    /**
     * Method For handling Error in Http request
     */
    protected handleError(error: Response | any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if(error.status===401) {
                this.onUnAuthorized();
            }
            const err = error.text() || error.json()||'';
            //const err = body.error_description ||  body.error || body.Message || JSON.stringify(body);
            errMsg = err;
            //this.errorHandle.handleError(error);
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
    
        return Observable.throw(errMsg);
    }
    /**
     * Method for Including Headers
     */
    private getHeaders(isSecured?: boolean): void {
        let headers = new Headers({});
        if (isSecured) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        }
        headers.append("Cache-Control", "no-cache, no-store, must-revalidate")
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        this.options = new RequestOptions({ headers: headers });
    }
    private onUnAuthorized() {
        localStorage.clear();
        if(location.hash!=='#/login') {
            this.router.navigate(['/login']);
           // this.messageService.setSessionTimeOutMessage(true);
        }
    }
}
