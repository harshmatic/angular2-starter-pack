import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceReviewHistory } from '../store/occurenceReviewHistory.model';
import { ORH_ACTIONS } from '../store/occurenceReviewHistory.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-occurence-book',
  templateUrl: 'orh.component.html',
})
export class OccurenceReviewHistoryComponent  implements OnInit {
  occurenceReviewHistory:OccurenceReviewHistory[];
  occurenceReviewHistoryObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.occurenceReviewHistoryObj = {
      obReviewHistoryID:"413rvab2-0d44-4fb9-8835-184db90a9999",
      obid:"411bfab2-0d44-4fb9-8835-184db90a9999",
      reveiwComments:"ABC"
  }
  this.patchReq.push(
//       {
//     "op":"replace",
//     "path":"/natureOfOccurrence",
//     "value":"test after patch 123"
//   }
  );
    this.store.dispatch({ type: ORH_ACTIONS.GET_LIST });
    // //Create
    this.store.dispatch({ type: ORH_ACTIONS.ADD,payload:this.occurenceReviewHistoryObj });
    // //Delete
   // this.store.dispatch({ type: ORH_ACTIONS.DELETE,payload:"411bfab2-0d44-4fb9-8835-184db90f5678" });
    // //Update (PUT)
   //this.store.dispatch({ type: ORH_ACTIONS.UPDATE,payload:{id:"411bfab2-0d44-4fb9-8835-184db90a9999",updates:this.occurenceReviewHistoryObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: ORH_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('occurenceReviewHistory').subscribe((res:any) => {
       this.occurenceReviewHistory = res;
     });
  }
}
