import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ACTIVITY_ACTIONS } from '../../../activity/store/activity.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'view-activity-feed',
    templateUrl: 'viewActivity.component.html',
})
export class ViewActivityFeedComponent implements OnInit, OnDestroy {
    activities: any[] = [];
    asyncActivities: Observable<any>
    showTab: boolean = true;
    pageNum: number = 1;
    stopScroll = false;
    private sub: Subscription = new Subscription();
    public obId; any;
    constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute, ) { }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.obId = params['OccurenceBookID'];
            });
        this.activities = [];
        this.getActivities();
        this.asyncActivities = this.store.select('activity')

        this.asyncActivities.subscribe((res: any) => {
            for (let i = res.length - 1; i >= 0; i--) {
                this.activities.push(res[i]);
            }
            if (res.length > 0) {
                this.pageNum++;
                this.stopScroll = false;
            } else {
                this.stopScroll = true;
            }
        })

    }
    getActivities() {
        if (!this.stopScroll && this.pageNum > 0) {
            this.store.dispatch({
                type: ACTIVITY_ACTIONS.GET_LIST_BY_OB,
                payload: { pageNum: this.pageNum, pageSize: 5, obID: this.obId }
            });
        }
    }

    back(){
        this.router.navigate(['/ob/occurenceEdit'], { queryParams: { OccurenceBookID: this.obId } });
    }
    onOBClick(id: any) {
        this.router.navigate(['/ob/occurenceEdit'], { queryParams: { OccurenceBookID: id } });
    }
    ngOnDestroy() {
        this.store.dispatch({ type: ACTIVITY_ACTIONS.CLEAR });
    }
}
