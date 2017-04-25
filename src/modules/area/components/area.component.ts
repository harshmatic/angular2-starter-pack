import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Area } from '../store/area.model';
import { AREA_ACTIONS } from '../store/area.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-area',
  templateUrl: 'area.component.html',
})
export class AreaComponent  implements OnInit {
  area:Area[];
  areaObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.areaObj = {
    "areaID":"56c385ae-ce46-41d4-b7fe-08df9aef9579",
   "areaName": "Area1-After Update",
    "areaCode": "A1-After Update",
    "pinCode": "1001",
    "createdOn": "2017-04-21T17:01:13.4386067",
    "createdBy": "00000000-0000-0000-0000-000000000000",
    "updatedOn": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false
  }
  this.patchReq.push({
   	"op":"replace",
	"path":"/areaName",
	"value":"test after patch"
  });
    this.store.dispatch({ type: AREA_ACTIONS.GET_LIST });
      //Create
   // this.store.dispatch({ type: AREA_ACTIONS.ADD,payload:this.areaObj });
     // //Delete
    this.store.dispatch({ type: AREA_ACTIONS.DELETE,payload:"56c385ae-ce46-41d4-b7fe-08df9aef9579" });
     //Update (PUT)
    //this.store.dispatch({ type: AREA_ACTIONS.UPDATE,payload:{id:"56c385ae-ce46-41d4-b7fe-08df9aef9579",updates:this.areaObj}});
    // //Update (PATCH)
     //this.store.dispatch({ type: AREA_ACTIONS.UPDATE,payload:{id:"56c385ae-ce46-41d4-b7fe-08df9aef9579",updates:this.patchReq}});
    this.store.select('area').subscribe((res:any) => {
       this.area = res;
     });
  }
}
