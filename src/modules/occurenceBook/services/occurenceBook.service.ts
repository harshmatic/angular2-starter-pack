/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { OccurenceBook } from '../store/occurenceBook.model';
import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'occurrencebook/';

/** Service Definition */
@Injectable()
export class OccurenceBookService extends BaseService {

    constructor(public http: Http, router: Router) {
        super(http,CONTEXT,router);
    }
    // Get All
    getObs(searchQuery?:any,pageNum?:any,pageSize?:any,areaId?:any) {
        
        return this.getList$(CONTEXT+"?searchQuery="+searchQuery+'&pageNumber='+pageNum+'&pageSize='+pageSize+'&areaId='+areaId,0,0,true).map(res => res.json());    
    }
    // Add One
    addOb(ob: any) {
        return this.post$(CONTEXT, ob).map(res => res.json());
    }
    //Update One
    saveOb(id: any, ob: any) {
        return this.put$(CONTEXT + id, ob, true).map(res => res.json());
    }
    // Delete One
    deleteOb(id: any) {
        return this.delete$(CONTEXT + id).map(res => res.json());
    }
    // Get One
    getOb(id: any) {
        return this.get$(CONTEXT + id, true).map(res => res.json());
    }
    // Update status history
    updateStatusHistory(id:any) {
        return this.get$(CONTEXT + id+'/statushistory',true).map(res => res.json());
    }
    // add review
    addReview (ob:any){
        return this.post$(CONTEXT+ob.OBID+'/addreview', ob,true).map(res => res.json());
    }

}
