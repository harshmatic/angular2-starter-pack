import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../store/employee.model';
import { EMPLOYEE_ACTIONS } from '../store/employee.actions';
@Component({
  moduleId: module.id,
  selector: 'app-employee',
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent  implements OnInit {
  employee:Employee[];
  constructor(private store: Store<Employee>){}
  ngOnInit() {
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_EMPLOYEE_LIST });
     this.store.select('employee').subscribe((res:any) => {
       console.log(res)
       this.employee = res;
     });
  }
}
