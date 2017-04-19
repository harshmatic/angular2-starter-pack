/** Angular Dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
/** Third Party Dependencies */
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/** Module Level Dependencies */
import { Employee } from '../store/employee.model';

/** Context for service calls */
const CONTEXT = 'Employee';

/** Service Definition */
@Injectable()
export class EmployeeService {

    constructor(public http: Http) {
    }


    getEmployeeList() {
        let headers = new Headers();
        // headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:3100/api/employee', options)
            .map(res => {
                return res.json();
            })
            .catch((err:any) => {
               console.log(err);
               return err
            });
    }

}
