import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Shift } from '../store/shift.model';
import { SHIFT_ACTIONS } from '../store/shift.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-shift',
  templateUrl: 'shift.component.html',
})
export class ShiftComponent  implements OnInit {
  shift:Shift[];
  shiftObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.shiftObj = {
             "shiftID": "318dc4df-684a-444f-9e5a-18bb5eed1123",
             "shiftName": "Shift1 - Updated",
             "startTime": "00:01:20",
             "endTime": "00:01:05",
  }
  this.patchReq.push({
    "op":"replace",
    "path":"/shiftName",
    "value":"test after patch"
  });
    this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST });
    // //Create
    // this.store.dispatch({ type: SHIFT_ACTIONS.ADD,payload:this.shiftObj });
    // //Delete
     //this.store.dispatch({ type: SHIFT_ACTIONS.DELETE,payload:"318dc4df-684a-444f-9e5a-18bb5eed1123" });
    // //Update (PUT)
    // this.store.dispatch({ type: SHIFT_ACTIONS.UPDATE,payload:{id:"318dc4df-684a-444f-9e5a-18bb5eed1123",updates:this.shiftObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: SHIFT_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('shift').subscribe((res:any) => {
       this.shift = res;
     });
  }
}
