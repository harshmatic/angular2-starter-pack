/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { OccurenceAssignment } from '../store/occurenceAssignment.model';
import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'occurrenceassignment/';

/** Service Definition */
@Injectable()
export class OccurenceAssignmentService extends BaseService {

    constructor(public http: Http) {
        super(http,CONTEXT);
    }
    // Get All
    getOas() {        
        return this.getList$(CONTEXT).map(res => res.json());    
    }
    // Add One
    addOa(oa:any) {        
        return this.post$(CONTEXT,oa).map(res => res.json());    
    }
    //Update One
    saveOa(id:any,oa:any) {        
        return this.put$(CONTEXT+id,oa, true).map(res => res.json());    
    }
    // Delete One
    deleteOa(id:any) {        
        return this.delete$(CONTEXT+id).map(res => res.json());    
    }
    // Get One
    getOa(id:any) {        
        return this.get$(CONTEXT+id).map(res => res.json());    
    }

}
