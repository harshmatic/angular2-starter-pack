/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Area } from '../store/area.model';
import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'areas/';

/** Service Definition */
@Injectable()
export class AreaService extends BaseService {

    constructor(public http: Http) {
        super(http, CONTEXT);
    }
    // Get All
    getAreas() {
        return this.getList$(CONTEXT, 0, 0, true).map(res => res.json());
    }
    // Add One
    addArea(area: any) {
        return this.post$(CONTEXT, area).map(res => res.json());
    }
    //Update One
    saveArea(id: any, area: any) {
        return this.put$(CONTEXT + id, area, true).map(res => res.json());
    }
    // Delete One
    deleteArea(id: any) {
        return this.delete$(CONTEXT + id).map(res => res.json());
    }
    // Get One
    getArea(id: any) {
        return this.get$(CONTEXT + id).map(res => res.json());
    }

}
