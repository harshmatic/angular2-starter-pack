/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService, EtagService} from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'statuses/';

/** Service Definition */
@Injectable()
export class StatusService extends BaseService {
    public statusData:any=[];
    constructor(public http: Http, router: Router, messageService: MessageService,public etagService:EtagService) {
        super(http, CONTEXT, router, messageService);
    }
    // Get All
    getStatusAll() {
        return  this.etagService.getListWithEtag(CONTEXT);
    }
    // Get All by pagination
    getStatusAllByPagination(payload) {
        return this.etagService.getListWithEtag(CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize);
    }
    // Add One
    addStatus(st: any) {
        return this.post$(CONTEXT, st, true).map(res => res.json());
    }
    //Update One
    saveStatus(id: any, st: any) {
        return this.put$(CONTEXT + id, st, true).map(res => res.json());
    }
    // Delete One
    deleteStatus(id: any) {
        return this.delete$(CONTEXT + id, true).map(res => res.json());
    }
    // Get One
    getStatus(id: any) {
        return this.get$(CONTEXT + id).map(res => res.json());
    }

}
