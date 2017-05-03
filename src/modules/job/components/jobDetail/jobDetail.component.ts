import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  templateUrl: 'jobDetail.component.html',
})
export class JobDetailComponent implements OnInit, OnDestroy {
  obs: any[] = [];
  asyncOb: Observable<any>
  showTab: boolean = true;
  private subscriptions: Subscription = new Subscription();
  queryString = '';
  constructor(private store: Store<OccurenceBook>, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: "" } });
    this.asyncOb = this.store.select('occurenceBook');
    this.subscriptions.add(this.asyncOb.subscribe((res: any) => {
      if (Object.keys(res).length>0) {
      this.obs = res;
      console.log("objectDetailsaaa=>",res);
      }
    })
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onKey(event: any) {
    this.queryString = event.target.value;
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: this.queryString } });

  }
  onOBClick(id: any) {
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: id } });
  }
  onCreateJob(){
    this.router.navigate(['/jobs/addJob']);
  }

}
