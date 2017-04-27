import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from '../store/dashboard.model';
import { DASHBOARD_ACTIONS } from '../store/dashboard.actions';
import { EMPLOYEE_ACTIONS } from '../../employee/store/employee.actions';
import {OB_ACTIONS} from '../../occurenceBook/store/occurenceBook.actions';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls:['dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  dashboard:Dashboard[];
  officers:any[]=[];
  asyncOfficer:Observable<any>
  obs:any[]=[];
  asyncOb:Observable<any>
  lat: number = 51.678418;
  lng: number = 7.809007;
    locations = [
    {id: 1,  lat: 51.5239935252832,    lng:  5.137663903579778,   content: '/assets/styles/images/red.svg'},
    {id: 2,  lat: 51.523853342911906,  lng:  5.1377765563584035,  content: '/assets/styles/images/blue.svg'},
    {id: 3,  lat: 51.5237298485607,    lng:  5.137969675407476,   content: '/assets/styles/images/red.svg'},
    {id: 4,  lat: 51.52355628836575,   lng:  5.138066234932012,   content: '/assets/styles/images/orange.svg'},
    {id: 5,  lat: 51.52340275379578,   lng:  5.138211074218816,   content: '/assets/styles/images/orange.svg'},
    {id: 6,  lat: 51.523199152806626,  lng:  5.138382735595769,   content: '/assets/styles/images/blue.svg'},
    {id: 7,  lat: 51.5229955509073,    lng:  5.138511481628484,   content: '/assets/styles/images/blue.svg'},
    {id: 8,  lat: 51.52280529912936,   lng:  5.138543668136663,   content: '/assets/styles/images/red.svg'},
    {id: 9,  lat: 51.523596340777075,  lng:  5.138463201866216,   content: '/assets/styles/images/blue.svg'},
    {id: 700,lat: 51.523372714362736,  lng:  5.1386992362595265,  content: '/assets/styles/images/red.svg'},
    {id: 101, lat: 51.52329594683302,  lng:  5.138838711128301,   content: '/assets/styles/images/orange.svg'}
  ];
  constructor(private store: Store<Dashboard>){}
  ngOnInit() {
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST });
    this.asyncOb= this.store.select('occurenceBook')
    this.asyncOb.subscribe((res:any) => {
       console.log(res)
       this.obs = res;
    });
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST });
    this.asyncOfficer= this.store.select('employee')
    this.asyncOfficer.subscribe((res:any) => {
     
       this.officers = res;
    });
   
     
  }
}
