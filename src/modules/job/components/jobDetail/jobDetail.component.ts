import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../../app/core/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from '../../../config';
import { Status } from '../../../config';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  styleUrls: ['jobDetail.component.css'],
  templateUrl: 'jobDetail.component.html',
})
export class JobDetailComponent implements OnInit,OnDestroy {
  jobPageNum: number = 1;
  userDetail: any;
  stopScroll = false
  obs: any[] = [];
  asyncOb: Observable<any>
  showTab: boolean = true;
  private subscriptions: Subscription;
  queryString = '';
  constructor(private store: Store<OccurenceBook>, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }


  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    this.store.dispatch({
        type: OB_ACTIONS.GET_LIST,
        payload: { search: this.queryString, pageNum: this.jobPageNum, pageSize: 5, areaId: this.userDetail.areaID }
    });
    this.asyncOb = this.store.select('occurenceBook');

    this.subscriptions = this.asyncOb.subscribe((res: any) => {
     for(let i=0; i<res.length;i++){
        this.obs.push(res[i]);
      }
      if (res.length > 0) {
       // this.jobPageNum++;
        this.stopScroll = false;
      } else {
        this.stopScroll = true;
      }
    })

  }
  ngOnDestroy() {
    this.store.dispatch({ type: OB_ACTIONS.CLEAR });
    this.subscriptions.unsubscribe();
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
      this.jobPageNum++;
      this.store.dispatch({
        type: OB_ACTIONS.GET_LIST,
        payload: { search: this.queryString, pageNum: this.jobPageNum, pageSize: 5, areaId: this.userDetail.areaID }
      });
    }
  }
  //Color Coding
  applyPriority(priority) {
    for (var key in Priority) {
      if (Priority.hasOwnProperty(priority)) {
        return Priority[priority];
      } else {
        return "blue";
      }
    }
  }
  applyIcon(priority) {
    for (var key in Priority) {
      if (Priority.hasOwnProperty(priority)) {
        return "/assets/styles/images/" + Priority[priority] + ".svg";
      } else {
        return "/assets/styles/images/blue.svg";
      }
    }

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
}
