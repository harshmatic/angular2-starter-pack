import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { Pipe, ChangeDetectorRef, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../../app/core/index';
import { ActivatedRoute, Router } from '@angular/router';
//import {TimeAgoPipe} from '../../../dashboard/components/dashboard-time-ago.pipe';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
  templateUrl: 'jobDetail.component.html',
})
export class JobDetailComponent implements OnInit {
  jobPageNum: number = 1;
  userDetail: any;
  stopScroll = false
  obs: any[] = [];
  asyncOb: Observable<any>
  showTab: boolean = true;
  private subscriptions: Subscription = new Subscription();
  queryString = '';
  constructor(private store: Store<OccurenceBook>, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }


  ngOnInit() {
    this.userDetail = this.authService.getCurrentUser();
    //this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: "" } });
    this.getJobs();
    this.asyncOb = this.store.select('occurenceBook');

    this.asyncOb.subscribe((res: any) => {
      // this.obs = res;
      for (let i = res.length - 1; i > 0; i--) {
        this.obs.push(res[i]);
      }
      console.log('occ =>', this.obs);
      if (res.length > 0) {
        this.jobPageNum++;
        this.stopScroll = false;
      } else {
        this.stopScroll = true;
      }
      //console.log('occurence=>',this.obs);
    })

  }

  onKey(event: any) {
    this.stopScroll = false;
    this.obs = []
    this.queryString = event.target.value;
    this.jobPageNum = 1;
    this.getJobs()
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
        type: OB_ACTIONS.GET_LIST,
        payload: { search: this.queryString, pageNum: this.jobPageNum, pageSize: 5, areaId: this.userDetail.areaID }
      });
    }
  }

}
