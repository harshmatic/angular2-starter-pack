import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../employee/store/employee.model';
import { EMPLOYEE_ACTIONS } from '../../../employee/store/employee.actions';
import { AuthService } from '../../../../app/core/index';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-officerList',
  templateUrl: 'officerList.component.html',
})
export class OfficerListComponent implements OnInit {
  userDetail: any;
  officerPageNum: number = 1;
  officers: any[] = [];
  asyncOfficer: Observable<any>
  showTab: boolean = true;
  queryString = '';
  stopScroll: boolean = false;
  constructor(private store: Store<Employee>, private authService: AuthService) { }

  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    this.officers = [];
    this.getOfficer();
    this.asyncOfficer = this.store.select('employee');
    this.asyncOfficer.subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.officers.push(res[i]);
      }
      if (res.length > 0) {
        this.officerPageNum++;
        this.stopScroll = false;
      } else {
        this.stopScroll = true;
      }
    });
  }

  onKey(event: any) {
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
}
