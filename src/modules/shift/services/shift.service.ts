/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService,EtagService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'shifts/';

/** Service Definition */
@Injectable()
export class ShiftService extends BaseService {

    constructor(public http: Http, router: Router, messageService: MessageService,public etagService:EtagService) {
        super(http, CONTEXT, router, messageService);
    }
    // Get All
    getShifts() {
        return  this.etagService.getListWithEtag(CONTEXT);

    }
    // Get All By Pagination
    getShiftsByPagination(payload){
         return this.etagService.getListWithEtag(CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize);
    }
    // Add One
    addShift(shift: any) {
        return this.post$(CONTEXT, shift, true).map(res => res.json());
    }
    //Update One
    saveShift(id: any, shift: any) {
        return this.put$(CONTEXT + id, shift, true).map(res => res.json());
    }
    // Delete One
    deleteShift(id: any) {
        return this.delete$(CONTEXT + id,true).map(res => res.json());
    }
    // Get One
    getShift(id: any) {
        return this.get$(CONTEXT + id,true).map(res => res.json());
    }

}
