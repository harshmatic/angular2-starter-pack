import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from '../store/dashboard.model';
import { DASHBOARD_ACTIONS } from '../store/dashboard.actions';
import {OB_ACTIONS} from '../../occurenceBook/store/occurenceBook.actions';
import { Ob } from '../../occurenceBook/services/ob';
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent  implements OnInit {
  dashboard:{};

  constructor(private store: Store<Dashboard>){}
  ngOnInit() {
   // this.store.dispatch({ type: DASHBOARD_ACTIONS.GET_DASHBOARD_LIST });
  // debugger;
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST });
  
     this.store.dispatch({ type: DASHBOARD_ACTIONS.ADD_DASHBOARD });
    // this.store.dispatch({type:})
        
     this.store.select('dashboard').subscribe((res:any) => {
     // debugger;
       this.dashboard = Ob;
     });
     
  }
}
