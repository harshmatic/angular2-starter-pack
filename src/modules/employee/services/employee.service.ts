/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Employee } from '../store/employee.model';
import { BaseService } from '../../../app/core/services/index';


/** Context for service calls */
const CONTEXT = 'employees/';

/** Service Definition */
@Injectable()
export class EmployeeService extends BaseService {
    constructor(public http: Http) {
        super(http,CONTEXT);
    }
    // Get All
    getEmployees() {      
        return this.getList$(CONTEXT,0,0,true).map(res => res.json());    
    }
    getEmployeesByPage(pageNum,pageSize,areaId) {      
        return this.getList$(CONTEXT+'?pageNumber='+pageNum+'&pageSize='+pageSize+'&areaId='+areaId,0,0,true).map(res => res.json());    
    }
    // Add One
    addEmployee(employee:any) {        
        return this.post$(CONTEXT,employee).map(res => res.json());    
    }
    //Update One
    saveEmployee(id:any,employee:any) {        
        return this.put$(CONTEXT+id,employee, true).map(res => res.json());    
    }
    // Delete One
    deleteEmployee(id:any) {        
        return this.delete$(CONTEXT+id).map(res => res.json());    
    }
    // Get One
    getEmployee(id:any) {        
        return this.get$(CONTEXT+id).map(res => res.json());    
    }

}
