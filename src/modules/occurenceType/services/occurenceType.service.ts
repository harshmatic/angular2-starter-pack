/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { OccurenceType } from '../store/occurenceType.model';
import { BaseService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'occurrencetype/';

/** Service Definition */
@Injectable()
export class OccurenceTypeService extends BaseService {

    constructor(public http: Http, router: Router,messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    // Get All
    getOts() {        
        return this.getList$(CONTEXT,0,0,true).map(res => res.json());    
    }
    // Add One
    addOt(ot:any) {        
        return this.post$(CONTEXT,ot).map(res => res.json());    
    }
    //Update One
    saveOt(id:any,ot:any) {        
        return this.put$(CONTEXT+id,ot, true).map(res => res.json());    
    }
    // Delete One
    deleteOt(id:any) {        
        return this.delete$(CONTEXT+id).map(res => res.json());    
    }
    // Get One
    getOt(id:any) {        
        return this.get$(CONTEXT+id).map(res => res.json());    
    }

}
