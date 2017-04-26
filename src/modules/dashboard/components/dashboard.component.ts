import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from '../store/dashboard.model';
import { DASHBOARD_ACTIONS } from '../store/dashboard.actions';
@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls:['dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  dashboard:Dashboard[];
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private store: Store<Dashboard>){}
  ngOnInit() {
    this.store.dispatch({ type: DASHBOARD_ACTIONS.GET_DASHBOARD_LIST });
    this.store.dispatch({ type: DASHBOARD_ACTIONS.ADD_DASHBOARD });
    this.store.select('dashboard').subscribe((res:any) => {
       this.dashboard = res;
    });
     
  }
}
