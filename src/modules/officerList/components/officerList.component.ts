import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../employee/store/employee.model';
import { EMPLOYEE_ACTIONS } from '../../employee/store/employee.actions';
declare var $:any;
@Component({
  moduleId: module.id,
  selector: 'app-officerList',
  templateUrl: 'officerList.component.html',
})
export class OfficerListComponent  implements OnInit {
  employee:Employee[];
  showTab:boolean=true;
  constructor(private store: Store<Employee>){}

  ngOnInit() {
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST });
    // this.store.dispatch({ type: EMPLOYEE_ACTIONS.ADD });
     $(".nav-tabs a").click(function () {
            $(this).tab('show');
        });
     this.store.select('employee').subscribe((res:any) => {
      
       this.employee = res;
     });
     
  }
  setTab(value,e) {
      if (value==1){
        this.showTab=true;
      } else if(value==2) {
        this.showTab=false;
      }


  }
}
