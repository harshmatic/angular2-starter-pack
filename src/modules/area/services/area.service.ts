/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService,MessageService, EtagService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'areas/';

/** Service Definition */
@Injectable()
export class AreaService extends BaseService {

    constructor(public http: Http, router: Router,messageService: MessageService, public etagService:EtagService) {
        super(http,CONTEXT, router,messageService);
    }
    // Get All
    getAreas() {
        let url = CONTEXT;
        return  this.etagService.getListWithEtag(url)
    }
    getAreaPagination(payload) {
        let url = CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize;
        return  this.etagService.getListWithEtag(url)
    }
    // Add One
    addArea(area: any) {
        return this.post$(CONTEXT, area, true).map(res => res.json());
    }
    //Update One
    saveArea(id: any, area: any) {
        return this.put$(CONTEXT + id, area, true).map(res => res.json());
    }
    // Delete One
    deleteArea(id: any) {
        return this.delete$(CONTEXT + id,true).map(res => res.json());
    }
    // Get One
    getArea(id: any) {
        return this.get$(CONTEXT + id,true).map(res => res.json());
    }

}
