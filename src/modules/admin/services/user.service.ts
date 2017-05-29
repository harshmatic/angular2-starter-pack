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
const CONTEXT = 'appusers/';

/** Service Definition */
@Injectable()
export class UserService extends BaseService {
    constructor(public http: Http, router: Router,messageService: MessageService) {
        super(http,CONTEXT, router,messageService);
    }
    getUsers(payload) {
        return this.getList$(CONTEXT+"?pageNumber="+payload.pageNumber+"&pageSize="+payload.pageSize, 0, 0, true).map(res => res);
    }
    getUsersList() {
        return this.getList$(CONTEXT, 0, 0, true).map(res => res);
    }
    getUserByID(userId:string){
        return this.getList$(CONTEXT+userId, 0, 0, true).map(res => res.json());
    }
    getUserRoles(userID: string) {
        return this.getList$(CONTEXT+userID+'/roles', 0, 0, true).map(res => res.json());
    }
    addUserRole(userID: string,payload:any) {
        return this.post$(CONTEXT +userID+'/roles',payload,true).map(res => res);
    }
    deleteUserRole(userID: string,payload:any) {
        return this.delete$(CONTEXT +userID+'/roles',true,payload).map(res => res);
    }
    addUser(payload:any) {
        return this.post$(CONTEXT,payload,true).map(res => res);
    }
    editUser(payload:any) {
        return this.put$(CONTEXT,payload,true).map(res => res);
    }
}
