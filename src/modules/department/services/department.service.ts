/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Department } from '../store/department.model';
import { BaseService } from '../../../app/core/services/index';
import { MessageService } from '../../../app/core/services/index';
/** Context for service calls */
const CONTEXT = 'departments/';

/** Service Definition */
@Injectable()
export class DepartmentService extends BaseService {

    constructor(public http: Http, router: Router,messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    // Get All
    getDepartments() {
        return this.getList$(CONTEXT, 0, 0, true).map(res => res.json());
    }
    getDepartmentPagination(payload) {
        return this.getList$(CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize, 0, 0, true).map(res => res);
    }
    // Add One
    addDepartment(department: any) {
        return this.post$(CONTEXT, department,true).map(res => res.json());
    }
    //Update One
    saveDepartment(id: any, department: any) {
        return this.put$(CONTEXT + id, department, true).map(res => res.json());
    }
    // Delete One
    deleteDepartment(id: any) {
        return this.delete$(CONTEXT + id,true).map(res => res.json());
    }
    // Get One
    getDepartment(id: any) {
        return this.get$(CONTEXT + id).map(res => res.json());
    }

}
