import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../employee/store/employee.model';
import { EMPLOYEE_ACTIONS } from '../../../employee/store/employee.actions';
import { AuthService } from '../../../../app/core/index';
import { Status } from '../../../config';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-officerList',
  templateUrl: 'officerList.component.html',
})
export class OfficerListComponent implements OnInit,OnDestroy {
  userDetail: any;
  officerPageNum: number = 1;
  officers: any[] = [];
  asyncOfficer: Observable<any>
  showTab: boolean = true;
  queryString = '';
  stopScroll: boolean = false;
  constructor(private store: Store<Employee>, private authService: AuthService) { }

  ngAfterViewInit(){
    $(document).ready(function () {
    if ($(window).width() <= 767) {

                var offset = $(".stickyRow").offset();
                var sticky = $(".stickyRow");
                var additionalPixels = 157;

                $(window).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > 156) {

                        if ($(window).scrollTop() > offset.top - additionalPixels) {
                            $(".stickyRow").addClass('affix');
                        } else {
                            $(".stickyRow").removeClass('affix');
                        }
                    } else {
                        $(".stickyRow").removeClass('affix');
                    }
                });
            }
    });
  }
  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    this.officers = [];
    this.getOfficer();
    this.asyncOfficer = this.store.select('employee');
    this.asyncOfficer.subscribe((res: any) => {
      if(res.employeeList.length===this.officers.length){
        this.stopScroll = true;
      } else {
        this.officerPageNum++;
        this.stopScroll = false;
      }
     this.officers = res.employeeList;
    });
  }

  applyStatus(status) {

    for (var key in Status) {
      if (Status.hasOwnProperty(status)) {
        return Status[status];
      } else {
        return Status['Open'];
      }
    }

  }
  onKey(event: any) {
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.CLEAR });
    this.stopScroll = false;
    this.officers = []
    this.queryString = event.target.value;
    this.officerPageNum = 1;
    this.getOfficer();
  }

  getOfficer() {
    if (!this.stopScroll && this.officerPageNum > 0) {
      this.store.dispatch({
        type: EMPLOYEE_ACTIONS.GET_LIST_BY_PAGE,
        payload: { search: this.queryString, pageNum: this.officerPageNum, pageSize: 5, areaId: this.userDetail.areaID }
      });
    }
  }
  ngOnDestroy() {
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.CLEAR });
  }
}
