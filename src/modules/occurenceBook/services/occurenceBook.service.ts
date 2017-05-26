/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { BaseService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'occurrencebook/';
import { Store } from '@ngrx/store';
/** Service Definition */
@Injectable()
export class OccurenceBookService extends BaseService {

    private Etag:any ='';
    constructor(public http: Http, router: Router,messageService: MessageService,private store:Store<any>) {
        super(http,CONTEXT,router,messageService);
    }
    // Get All
    getObs(searchQuery?:any,pageNum?:any,pageSize?:any,areaId?:any) {
        
    var etag = this.store.select('occurenceBook').subscribe(res=> res);
    console.log(etag);
    return this.getList$(CONTEXT+"?searchQuery="+searchQuery+'&pageNumber='+pageNum+'&pageSize='+pageSize+'&areaId='+areaId+'&orderBy=obTime'+' '+'desc',0,0,true).map(res => res);    
  
         
    }
    getObsOff(searchQuery?:any,pageNum?:any,pageSize?:any,assignedTo?:any) {
        
        return this.getList$(CONTEXT+"?searchQuery="+searchQuery+'&pageNumber='+pageNum+'&pageSize='+pageSize+'&assignedTo='+assignedTo,0,0,true).map(res => res.json());    
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
    //Reviewed by salauddin
    // Add One
    addJob(payload: any) {
        return this.post$('occurrencebook', payload, true).map(res => res.json());
    }
    //Update One
    updateOfficer(payload: any) {
        return this.put$(CONTEXT + payload.obid, payload, true).map(res => []);
    }

}
