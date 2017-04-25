/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { OccurenceReviewHistory } from '../store/occurenceReviewHistory.model';
import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'occurrencereviewhistory/';

/** Service Definition */
@Injectable()
export class OccurenceReviewHistoryService extends BaseService {

    constructor(public http: Http) {
        super(http,CONTEXT);
    }
    // Get All
    getOrhs() {        
        return this.getList$(CONTEXT).map(res => res.json());    
    }
    // Add One
    addOrh(orh:any) {        
        return this.post$(CONTEXT,orh).map(res => res.json());    
    }
    //Update One
    saveOrh(id:any,orh:any) {        
        return this.put$(CONTEXT+id,orh, true).map(res => res.json());    
    }
    // Delete One
    deleteOrh(id:any) {        
        return this.delete$(CONTEXT+id).map(res => res.json());    
    }
    // Get One
    getOrh(id:any) {        
        return this.get$(CONTEXT+id).map(res => res.json());    
    }

}
