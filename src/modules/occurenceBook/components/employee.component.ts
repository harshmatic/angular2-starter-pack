import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import { Employee } from '../store/employee.model';
import { OB_ACTIONS } from '../store/occurenceBook.actions';
@Component({
  moduleId: module.id,
  selector: 'app-occurence-book',
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent  implements OnInit {
  employee:any[];
  constructor(private store: Store<any>){}
  ngOnInit() {
    // console.log("asdkh");
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST });
     this.store.select('occurenceBook').subscribe((res:any) => {
       console.log(res)
       this.employee = res;
     });
  }
}
