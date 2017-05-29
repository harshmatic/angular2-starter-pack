import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AREA_ACTIONS } from '../store/area.actions';
@Component({
  moduleId: module.id,
  selector: 'app-area',
  templateUrl: 'area.component.html',
})
export class AreaComponent  implements OnInit {
  area:any[];
  areaObj:any = {};
  constructor(private store: Store<any>){}

  ngOnInit() {  
    this.store.dispatch({ type: AREA_ACTIONS.GET_LIST });
     // //Create
   // this.store.dispatch({ type: AREA_ACTIONS.ADD,payload:this.areaObj });
    // //Delete
   // this.store.dispatch({ type: AREA_ACTIONS.ADD });
    // //Update (PUT)
    //this.store.dispatch({ type: AREA_ACTIONS.UPDATE,payload:{id:"56c385ae-ce46-41d4-b7fe-08df9aef9579",updates:this.areaObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: AREA_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('area').subscribe((res:any) => {
       this.area = res;
     });
  }
}
