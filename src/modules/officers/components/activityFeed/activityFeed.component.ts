import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../employee/store/employee.model';
import { EMPLOYEE_ACTIONS } from '../../../employee/store/employee.actions';
declare var $:any;
@Component({
  moduleId: module.id,
  selector: 'app-activity-feed',
  templateUrl: 'activityFeed.component.html',
})
export class ActivityFeedComponent  implements OnInit {
  officers:any[]=[];
  asyncOfficer:Observable<any>
  showTab:boolean=true;
  constructor(private store: Store<Employee>){}

  ngOnInit() {
    // this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST });
    // this.asyncOfficer= this.store.select('employee')
    // this.asyncOfficer.subscribe((res:any) => {
    //    this.officers = res;
    // });
     
  }
}
