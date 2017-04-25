import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook } from '../store/occurenceBook.model';
import { OB_ACTIONS } from '../store/occurenceBook.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-occurence-book',
  templateUrl: 'ob.component.html',
})
export class OccurenceBookComponent  implements OnInit {
  occurenceBook:OccurenceBook[];
  occurenceBookObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.occurenceBookObj = {
    "obid": "411bfab2-0d44-4fb9-8835-184db90a9999",
    "areaID": "411bfab2-0d44-4fb9-8835-184db90f44fa",
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
    "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
    "mstStatus": null,
    "statusID": "EBEED096-EA34-43E2-948E-32BB98F31401",
    "obNumber": "987",
    "obTime": "2017-04-22T17:23:14.9100866",
    "caseFileNumber": "55",
    "natureOfOccurrence": "test after put1",
    "remark": "Test Remark 123"
  }
  this.patchReq.push({
    "op":"replace",
    "path":"/natureOfOccurrence",
    "value":"test after patch 123"
  });
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST });
    // //Create
    this.store.dispatch({ type: OB_ACTIONS.ADD,payload:this.occurenceBookObj });
    // //Delete
   // this.store.dispatch({ type: OB_ACTIONS.DELETE,payload:"411bfab2-0d44-4fb9-8835-184db90f5678" });
    // //Update (PUT)
   //this.store.dispatch({ type: OB_ACTIONS.UPDATE,payload:{id:"411bfab2-0d44-4fb9-8835-184db90a9999",updates:this.occurenceBookObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: OB_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('occurenceBook').subscribe((res:any) => {
       this.occurenceBook = res;
     });
  }
}
