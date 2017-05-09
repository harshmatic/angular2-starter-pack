import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from '../store/dashboard.model';
import { DASHBOARD_ACTIONS } from '../store/dashboard.actions';
import { EMPLOYEE_ACTIONS } from '../../employee/store/employee.actions';
import { OB_ACTIONS } from '../../occurenceBook/store/occurenceBook.actions';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
//import { TimeAgoPipe } from './dashboard-time-ago.pipe';
import * as moment from 'moment';
import { REPORTS_ACTIONS } from '../../reports/store/reports.actions';
import { AuthService } from '../../../app/core/index';
import { Subscription } from 'rxjs/Subscription';
import { Priority } from '../../config';
import { Status } from '../../config';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
//@Pipe({ name: 'amDifference' })
export class DashboardComponent implements OnInit,OnDestroy {
  userDetail: any
  isValid = true;
  officerPageNum: number = 0;
  dashboard: Dashboard[];
  officers: any[] = [];
  date: any;
  time: any;
  asyncOfficer: Observable<any>
  offReport: any;
  caseReport: any;
  asyncCaseReport: Observable<any>;
  asyncOfficerReport: Observable<any>;
  obs: any[] = [];
  asyncOb: Observable<any>
  private subscriptions: Subscription;
  locations: any;
  constructor(private store: Store<Dashboard>, private authService: AuthService) { }
  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    this.officers = []
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: "", pageNum: 1, pageSize: 5, areaId: this.userDetail.areaID } });
    this.asyncOb = this.store.select('occurenceBook')
    this.subscriptions =  this.asyncOb.subscribe((res: any) => {
      if (res.length > 0) {
        this.obs = res;
      }

      //console.log("Occurence=>",res);
      this.locations = this.obs[0];
    });
    this.store.dispatch({
      type: EMPLOYEE_ACTIONS.GET_LIST_BY_PAGE,
      payload: { search: "", pageNum: 1, pageSize: 5, areaId: this.userDetail.areaID }
    });
    this.asyncOfficer = this.store.select('employee')
    this.asyncOfficer.subscribe((res: any) => {
      this.officers = res
    });
    this.store.dispatch({ type: REPORTS_ACTIONS.GET_CASE_LIST });
    this.asyncCaseReport = this.store.select('reports')
    this.asyncCaseReport.subscribe((res: any) => {
      this.caseReport = res;
    });



  }
  ngOnDestroy() {
    this.store.dispatch({ type: OB_ACTIONS.CLEAR });
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.CLEAR });
    this.subscriptions.unsubscribe();
  }
  applyPriority(priority) {
    for (var key in Priority) {
      if (key == priority) {
        return Priority[key];
      } else {
        return "blue";
      }
    }
  }
   applyIcon(priority) {
    for (var key in Priority) {
      if (key == priority) {
        return "/assets/styles/images/"+Priority[key]+".svg";
      } else {
        return "/assets/styles/images/blue.svg";
      }
    }
  }
    
  
applyStatus(status){
 
  // for (var key in Status) {
  //    console.log(key)
  //     if (key == status) {
        return Status[status];
    //   } else {
    //     return Status['Open'];
    //   }
    // }

  }
  ngAfterViewInit() {
    $(document).ready(function () {

      $(".marker").click(function () {
        $("span.active").removeClass('active');
        $(".jobContentCard").fadeOut(500);
        $(this).addClass('active');
        $(".jobContentCard").fadeIn(500);
      });
      $('.closeBtn').on("click", function () {
        $(this).siblings('div.row').fadeOut();
        $(this).addClass('noDisplay');
        $(this).fadeOut();
        $(".marker").removeClass('active');
      });
      //console.log($(window).width());
      if ($(window).width() >= 768) {
        $('#statBar').removeClass('carousel-inner');

        $('#myCarousel').children('.carousel-indicators').css('display', 'none');

      }
    });
  }

}
