/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Designation } from '../store/designation.model';
import { BaseService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'designations/';

/** Service Definition */
@Injectable()
export class DesignationService extends BaseService {

    constructor(public http: Http, router: Router,messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    // Get All
    getDesignations() {
        return this.getList$(CONTEXT, 0, 0, true).map(res => res.json());
    }
    // Add One
    addDesignation(designation: any) {
        return this.post$(CONTEXT, designation).map(res => res.json());
    }
    //Update One
    saveDesignation(id: any, designation: any) {
        return this.put$(CONTEXT + id, designation, true).map(res => res.json());
    }
    // Delete One
    deleteDesignation(id: any) {
        return this.delete$(CONTEXT + id).map(res => res.json());
    }
    // Get One
    getDesignation(id: any) {
        return this.get$(CONTEXT + id).map(res => res.json());
    }

}
