import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { Subscription } from 'rxjs/Subscription';
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
  constructor(private store: Store<OccurenceBook>) { }

  ngOnInit() {

    this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: "" } });
    this.asyncOb = this.store.select('occurenceBook');
    this.subscriptions.add(this.asyncOb.subscribe((res: any) => {
      this.obs = res;
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

}
