import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ACTIVITY_ACTIONS } from '../store/activity.actions'
@Component({
  moduleId: module.id,
  selector: 'app-activity',
  template: 'hi',
})
export class ActivityComponent  implements OnInit {
  activity:any[];
  constructor(private store: Store<any>){}

  ngOnInit() {
   
 
    this.store.dispatch({ type: ACTIVITY_ACTIONS.GET_LIST });
    this.store.select('activity').subscribe((res:any) => {
       this.activity = res;
     });
  }
}
