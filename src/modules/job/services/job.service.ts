/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService } from '../../../app/core/services/index';


/** Context for service calls */
const CONTEXT = 'occurrencebook';

/** Service Definition */
@Injectable()
export class JobService extends BaseService {
    constructor(public http: Http) {
        super(http,CONTEXT);
    }
    // Add One
    addJob(payload:any) {        
        return this.post$('occurrencebook',payload).map(res => res.json());    
    }

}
