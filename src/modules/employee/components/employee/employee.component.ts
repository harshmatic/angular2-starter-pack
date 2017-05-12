import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../store/employee.model';
import { EMPLOYEE_ACTIONS } from '../../store/employee.actions';
import { Patch } from '../../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-employee',
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent  implements OnInit {
  employee:Employee[];
  dynamicData:Employee[];
  employeeObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.employeeObj = {

        "employeeID":"f12c0c13-28c7-46bb-17cf-08d48b9d1344",
        //object start
         "areaID":"56c385ae-ce46-41d4-b7fe-08df9aef9579",
        "departmentID":"a1da1d8e-1111-4634-b538-a01709471111",
        "designationID":"2b72f829-5195-46c3-a6a4-06f817f11093",
        "shiftID":"318dc4df-684a-444f-9e5a-18bb5eed1123",
       //object end
        "firstName":"First Name1",
        "lastName":"Last Name1",
        "employeeCode":"Emp001",
        "dateofBirth":"1987-04-25T11:06:51.5368538",
        "gender":"Male",
        "mobile":"1234567890",
        "email":"Test1@test.com",
        "residencePhone1":null,
        "organizationJoiningDate":"2012-04-25T11:06:51.5368538",
        "serviceJoiningDate":"2012-04-25T11:06:51.5368538",
        "address1":"Test Address 1",
        "address2":null,
        "userID":null
  }
  this.patchReq.push({
    "op":"replace",
    "path":"/firstName",
    "value":"test after patch"
  });
  //  this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST });
    // //Create
//this.store.dispatch({ type: EMPLOYEE_ACTIONS.ADD,payload:this.employeeObj });
    // //Delete
//this.store.dispatch({ type: EMPLOYEE_ACTIONS.DELETE,payload:"f12c0c13-28c7-46bb-17cf-08d48b9d1344" });
    // //Update (PUT)
    // this.store.dispatch({ type: EMPLOYEE_ACTIONS.UPDATE,payload:{id:"f12c0c13-28c7-46bb-17cf-08d48b9d1344",updates:this.employeeObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: EMPLOYEE_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    
    this.store.select('employee').subscribe((res:any) => {
       this.employee = res;
      
      
     });
  }
}
