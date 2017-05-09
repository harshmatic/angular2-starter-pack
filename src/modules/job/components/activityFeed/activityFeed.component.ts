import { Component, OnInit,AfterViewInit } from '@angular/core';
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
export class ActivityFeedComponent  implements OnInit {
  activities:any[]=[];
  asyncActivities:Observable<any>
  showTab:boolean=true;
  constructor(private store: Store<any>, private router: Router){}

  ngOnInit() {
    this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST });
    this.asyncActivities= this.store.select('activity')
    this.asyncActivities.subscribe((res:any) => {
       this.activities = res;
    });
     
  }
  onOBClick(id: any) {
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: id } });
  }
}
