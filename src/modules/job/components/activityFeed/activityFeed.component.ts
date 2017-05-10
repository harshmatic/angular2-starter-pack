import { Component, OnInit,AfterViewInit,OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ACTIVITY_ACTIONS } from '../../../activity/store/activity.actions';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;
@Component({
  moduleId: module.id,
  selector: 'app-activity-feed',
  templateUrl: 'activityFeed.component.html',
})
export class ActivityFeedComponent  implements OnInit,OnDestroy {
  activities:any[]=[];
  asyncActivities:Observable<any>
  showTab:boolean=true;
  pageNum:number = 1;
  stopScroll = false;
  constructor(private store: Store<any>, private router: Router){}

  ngOnInit() {
    this.activities=[];
    this.getActivities();
    this.asyncActivities= this.store.select('activity')

    this.asyncActivities.subscribe((res: any) => {
      if(res.length===this.activities.length){
        this.stopScroll = true;
      } else {
        this.pageNum++;
        this.stopScroll = false;
      }
     this.activities = res;
    })
     
  }
  getActivities(){
     if (!this.stopScroll && this.pageNum > 0) {
     this.store.dispatch({
      type: ACTIVITY_ACTIONS.GET_LIST,
      payload: { pageNum: this.pageNum, pageSize: 5 }
    });
  }
}


  onOBClick(id: any) {
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: id } });
  }
  ngOnDestroy() {
    this.store.dispatch({ type: ACTIVITY_ACTIONS.CLEAR });
  }
}
