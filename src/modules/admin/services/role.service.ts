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
    getRolePermissions(id: string) {
        return this.getList$(CONTEXT+id+'/permissions', 0, 0, true).map(res => res.json());
    }
    addPermissionToRole(roleID: string,payload:any) {
        return this.post$(CONTEXT +roleID+'/permissions',payload,true).map(res => res);
    }
    deleteRolePermission(id: string,payload:any) {
        return this.delete$(CONTEXT +id+'/permissions',true,payload).map(res => res);
    }
    deleteRole(userID: string) {
        return this.delete$(CONTEXT+userID,true).map(res => res.json());
    }
    addRole(payload:any){
        return this.post$(CONTEXT,payload,true).map(res => res.json());
    }
}
