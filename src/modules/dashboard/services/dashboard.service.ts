/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Dashboard } from '../store/dashboard.model';
import { BaseService } from '../../../app/core/services/index';

/** Context for service calls */
const CONTEXT = 'dashboard';

/** Service Definition */
@Injectable()
export class DashboardService extends BaseService {

    constructor(public http: Http) {
        super(http,CONTEXT);
    }

}
