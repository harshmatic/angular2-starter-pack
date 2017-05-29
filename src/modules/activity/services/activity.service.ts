/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService } from '../../../app/core/services/index';
import { MessageService, EtagService  } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'occurrencebook/GetOccurrenceBookActivity/';

/** Service Definition */
@Injectable()
export class ActivityService extends BaseService {

    constructor(public http: Http, router: Router,messageService: MessageService, public etagService:EtagService) {
        super(http,CONTEXT, router,messageService);
    }
    // Get All
    getActivity(pageNum?:any,pageSize?:any) {
        let url =CONTEXT+'?&pageNumber='+pageNum+'&pageSize='+pageSize
        return  this.etagService.getListWithEtag(url)
        //return this.getList$(CONTEXT+'?&pageNumber='+pageNum+'&pageSize='+pageSize, 0, 0, true).map(res => res.json());
    }

    getActivityByOB(pageNum?:any,pageSize?:any,id?:any){
        let url = CONTEXT+'?&pageNumber='+pageNum+'&pageSize='+pageSize+'&obID='+id
        return this.etagService.getListWithEtag(url)
        //return this.getList$(CONTEXT+'?&pageNumber='+pageNum+'&pageSize='+pageSize+'&obID='+id, 0, 0, true).map(res => res.json());
    }


}
