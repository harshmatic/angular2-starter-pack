/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Status } from '../store/status.model';
import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'status/';

/** Service Definition */
@Injectable()
export class StatusService extends BaseService {

    constructor(public http: Http, router: Router) {
        super(http,CONTEXT, router);
    }
    // Get All
    getStatusAll() {        
        return this.getList$(CONTEXT).map(res => res.json());    
    }
    // Add One
    addStatus(st:any) {        
        return this.post$(CONTEXT,st).map(res => res.json());    
    }
    //Update One
    saveStatus(id:any,st:any) {        
        return this.put$(CONTEXT+id,st, true).map(res => res.json());    
    }
    // Delete One
    deleteStatus(id:any) {        
        return this.delete$(CONTEXT+id).map(res => res.json());    
    }
    // Get One
    getStatus(id:any) {        
        return this.get$(CONTEXT+id).map(res => res.json());    
    }

}
