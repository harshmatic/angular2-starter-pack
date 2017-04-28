import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from '../store/dashboard.model';
import { DASHBOARD_ACTIONS } from '../store/dashboard.actions';
import { EMPLOYEE_ACTIONS } from '../../employee/store/employee.actions';
import {OB_ACTIONS} from '../../occurenceBook/store/occurenceBook.actions';
import {Pipe, ChangeDetectorRef, PipeTransform} from '@angular/core';
import {TimeAgoPipe} from './dashboard-time-ago.pipe';
import * as moment from 'moment';
import {REPORTS_ACTIONS} from '../../reports/store/reports.actions';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls:['dashboard.component.css']
})
@Pipe({ name: 'amDifference' })
export class DashboardComponent  implements OnInit {
   isValid = true;
  dashboard:Dashboard[];
  officers:any[]=[];
  date:any;
  time:any;
  asyncOfficer:Observable<any>
  offReport:any;
  caseReport:any;
  asyncCaseReport:Observable<any>;
  asyncOfficerReport:Observable<any>;
  obs:any[]=[];
  asyncOb:Observable<any>
  locations:any;
  constructor(private store: Store<Dashboard>){}
  ngOnInit() {
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST,payload:{search:""} });
    this.asyncOb= this.store.select('occurenceBook')
    this.asyncOb.subscribe((res:any) => {
        this.obs = res;
       this.locations=this.obs[0];
    });
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST });
    this.asyncOfficer= this.store.select('employee')
   
    this.asyncOfficer.subscribe((res:any) => {
     
       this.officers = res;

    });
    this.store.dispatch({ type: REPORTS_ACTIONS.GET_CASE_LIST });
    this.asyncCaseReport= this.store.select('reports')
    this.asyncCaseReport.subscribe((res:any) => {
       this.caseReport = res;
      
    });
    this.store.dispatch({ type: REPORTS_ACTIONS.GET_OFFICER_LIST });
    this.asyncOfficerReport= this.store.select('reports')
    this.asyncOfficerReport.subscribe((res:any) => {
     
       this.offReport = res;
      
    });
     
    
  }
  

}
