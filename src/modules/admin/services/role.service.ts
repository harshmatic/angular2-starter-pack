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
const CONTEXT = 'roles/';

/** Service Definition */
@Injectable()
export class RoleService extends BaseService {
    constructor(public http: Http, router: Router,messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    getRoles() {
        return this.getList$(CONTEXT, 0, 0, true).map(res => res.json());
    }
    getUserByID(userId:string){
        return this.getList$(CONTEXT+userId, 0, 0, true).map(res => res.json());
    }
    getUserRoles(userID: string) {
        return this.getList$(CONTEXT+userID+'/roles', 0, 0, true).map(res => res.json());
    }
    addUserRole(userID: string,payload:any) {
        return this.post$(CONTEXT +userID+'/roles',payload,true).map(res => res.json());
    }
    deleteUserRole(userID: string,payload:any) {
        return this.delete$(CONTEXT +userID+'/roles',payload).map(res => res.json());
    }
}
