import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceAssignment } from '../store/occurenceAssignment.model';
import { OA_ACTIONS } from '../store/occurenceAssignment.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-occurence-assignment',
  templateUrl: 'oa.component.html',
})
export class OccurenceAssignmentComponent  implements OnInit {
  occurenceAssignment:OccurenceAssignment[];
  occurenceAssignmentObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.occurenceAssignmentObj = {
      OBAssignmentID:"513sh2-0d44-4fb9-8835-184db90a9999",
      obid:"411bfab2-0d44-4fb9-8835-184db90a9999",
      comments:"ABC",
      assignedTO:"ABC"
  }
  this.patchReq.push(
  //    {
    //"op":"replace",
    //"path":"/natureOfOccurrence",
    //"value":"test after patch 123"
 // }
  );
    this.store.dispatch({ type: OA_ACTIONS.GET_LIST });
    // //Create
   // this.store.dispatch({ type: OA_ACTIONS.ADD,payload:this.occurenceAssignmentObj });
    // //Delete
   // this.store.dispatch({ type: OA_ACTIONS.DELETE,payload:"411bfab2-0d44-4fb9-8835-184db90f5678" });
    // //Update (PUT)
   //this.store.dispatch({ type: OA_ACTIONS.UPDATE,payload:{id:"411bfab2-0d44-4fb9-8835-184db90a9999",updates:this.occurenceAssignmentObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: OA_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('occurenceAssignment').subscribe((res:any) => {
       this.occurenceAssignment = res;
     });
  }
}
