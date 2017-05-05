/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'occurrencebook';

/** Service Definition */
@Injectable()
export class JobService extends BaseService {
    constructor(public http: Http, router: Router, messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    // Add One
    addJob(payload: any) {
        return this.post$('occurrencebook', payload, true).map(res => res.json());
    }
    //Update One
    updateOfficer(payload: any) {
        return this.put$(CONTEXT + '/' + payload.obid, payload, true).map(res => []);
    }

}
