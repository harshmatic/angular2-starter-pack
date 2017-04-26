/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { OccurenceBook } from '../store/occurenceBook.model';
import { Ob } from './ob';

import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'occurrencebook/';

/** Service Definition */
@Injectable()
export class OccurenceBookService extends BaseService {

    constructor(public http: Http) {
        super(http,CONTEXT);
    }
    // Get All
    getObs() { 
           //debugger;    
        //return this.getList$(CONTEXT).map(res => res.json()); 
        console.log("hi");
        return new Observable<any>((observer:any) => {
            observer.next(Ob);
        });;
          
    }
    // Add One
    addOb(ob:any) {   
        //debugger;     
        return this.post$(CONTEXT,ob).map(res => res.json());    
    }
    //Update One
    saveOb(id:any,ob:any) {        
        return this.put$(CONTEXT+id,ob, true).map(res => res.json());    
    }
    // Delete One
    deleteOb(id:any) {        
        return this.delete$(CONTEXT+id).map(res => res.json());    
    }
    // Get One
    getOb(id:any) {        
        return this.get$(CONTEXT+id).map(res => res.json());    
    }

}
