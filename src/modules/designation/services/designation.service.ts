/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */                        
import { BaseService, EtagService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'designations/';

/** Service Definition */
@Injectable()
export class DesignationService extends BaseService {

    constructor(public http: Http, router: Router,messageService: MessageService, public etagService:EtagService) {
        super(http,CONTEXT, router,messageService);
    }
    // Get All
    getDesignations() {
        let url = CONTEXT;
        return  this.etagService.getListWithEtag(url)
        //return this.getList$(CONTEXT, 0, 0, true).map(res => res.json());
    }
    getDesignationsPagination(payload) {
        let url = CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize;
        return  this.etagService.getListWithEtag(url)
        //return this.getList$(CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize, 0, 0, true).map(res => res);
    }
    // Add One
    addDesignation(designation: any) {
        return this.post$(CONTEXT, designation,true).map(res => res.json());
    }
    //Update One
    saveDesignation(id: any, designation: any) {
        return this.put$(CONTEXT + id, designation, true).map(res => res.json());
    }
    // Delete One
    deleteDesignation(id: any) {
        return this.delete$(CONTEXT + id,true).map(res => res.json());
    }
    // Get One
    getDesignation(id: any) {
        return this.get$(CONTEXT + id).map(res => res.json());
    }

}
