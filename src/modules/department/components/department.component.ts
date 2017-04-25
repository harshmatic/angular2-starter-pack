import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Department } from '../store/department.model';
import { DEPARTMENT_ACTIONS } from '../store/department.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-department',
  templateUrl: 'department.component.html',
})
export class DepartmentComponent  implements OnInit {
  department:Department[];
  departmentObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.departmentObj = {
        "departmentID": "a1da1d8e-1111-4634-b538-a01709471111",
        "departmentName": "Dept Name after Edit",
        "departmentDespcription": "Dept Desc after edit",
  }
  this.patchReq.push({
    "op":"replace",
    "path":"/departmentName",
    "value":"test after patch"
  });
    this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    // //Create
    // this.store.dispatch({ type: DEPARTMENT_ACTIONS.ADD,payload:this.departmentObj });
    // //Delete
    // this.store.dispatch({ type: DEPARTMENT_ACTIONS.DELETE,payload:"a7c15c4c-e83c-4d8c-a010-53a41d2a88e9" });
    // //Update (PUT)
     //this.store.dispatch({ type: DEPARTMENT_ACTIONS.UPDATE,payload:{id:"a1da1d8e-1111-4634-b538-a01709471111",updates:this.departmentObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: OB_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('department').subscribe((res:any) => {
       this.department = res;
     });
  }
}
