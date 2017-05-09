import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
//import { TimeAgoPipe } from './dashboard-time-ago.pipe';
import * as moment from 'moment';
import { AuthService } from '../../../../app/core/index';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'app-assigned',
  templateUrl: 'assigned.component.html',
  styleUrls: ['assigned.component.css']
})
//@Pipe({ name: 'amDifference' })
export class AssignedComponent implements OnInit {
   jobPageNum: number = 1;
  userDetail: any;
  stopScroll = false
  obs: any[] = [];
  asyncOb: Observable<any>
  showTab: boolean = true;
  private subscriptions: Subscription = new Subscription();
  queryString = '';
  constructor(private store: Store<any>, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    this.getJobs();
    this.asyncOb = this.store.select('occurenceBook');

    this.asyncOb.subscribe((res: any) => {
      for (let i = res.length - 1; i >= 0; i--) {
        this.obs.push(res[i]);
      }
      if (res.length > 0) {
        this.jobPageNum++;
        this.stopScroll = false;
      } else {
        this.stopScroll = true;
      }
    })

  }

  onKey(event: any) {
    this.stopScroll = false;
    this.obs = []
    this.queryString = event.target.value;
    this.jobPageNum = 1;
    this.getJobs()
  }
  ngAfterViewInit() {
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
  onOBClick(id: any) {
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: id } });
  }
  onCreateJob() {
    this.router.navigate(['/jobs/addJob']);
  }
  getJobs() {
    if (!this.stopScroll && this.jobPageNum > 0) {
      this.store.dispatch({
        type: OB_ACTIONS.GET_LIST_BY_OFFICER,
        payload: { search: this.queryString, pageNum: this.jobPageNum, pageSize: 5, assignedTo: this.userDetail.employeeID }
      });
    }
  }
 

}
