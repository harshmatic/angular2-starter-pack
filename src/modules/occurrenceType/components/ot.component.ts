import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceType } from '../store/occurenceType.model';
import { OT_ACTIONS } from '../store/occurenceType.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-occurence-type',
  templateUrl: 'ot.component.html',
})
export class OccurenceTypeComponent  implements OnInit {
  occurenceType:OccurenceType[];
  occurenceTypeObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.occurenceTypeObj = {
     "obTypeID": "758b1995-7f92-4d87-9588-b90800abf111",
     "obTypeName": "Occurrence Type 1 - After Update",
     "createdOn": "2017-04-21T19:13:44.8223999",
     "createdBy": "00000000-0000-0000-0000-000000000000",
     "updatedOn": "0001-01-01T00:00:00",
     "updatedBy": "00000000-0000-0000-0000-000000000000",
     "isDelete": false
  }
  this.patchReq.push({
    	"op":"replace",
	    "path":"/obTypeName",
	    "value":"test after patch"
  });
    this.store.dispatch({ type: OT_ACTIONS.GET_LIST });
    // //Create
   // this.store.dispatch({ type: OT_ACTIONS.ADD,payload:this.occurenceTypeObj });
    // //Delete
    this.store.dispatch({ type: OT_ACTIONS.DELETE,payload:"758b1995-7f92-4d87-9588-b90800abf111" });
    // //Update (PUT)
    //this.store.dispatch({ type: OT_ACTIONS.UPDATE,payload:{id:"758b1995-7f92-4d87-9588-b90800abf111",updates:this.occurenceTypeObj}});
    // //Update (PATCH)
    
    // this.store.dispatch({ type: OT_ACTIONS.UPDATE,payload:{id:"758b1995-7f92-4d87-9588-b90800abf111",updates:this.patchReq}});
    this.store.select('occurenceType').subscribe((res:any) => {
       this.occurenceType = res;
     });
  }
}
