import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Designation } from '../store/designation.model';
import { DESIGNATION_ACTIONS } from '../store/designation.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-designation',
  templateUrl: 'designation.component.html',
})
export class DesignationComponent  implements OnInit {
  designation:Designation[];
  designationObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.designationObj = {
         "designationID": "6aac273a-ab24-4959-8c93-6f52cfee56ff",
         "designationName": "Assistant Commissioner of Police - Updated",
         "designationCode": "DCP - Updated",
  }
  this.patchReq.push({
    "op":"replace",
    "path":"/designationName",
    "value":"test after patch"
  });
    this.store.dispatch({ type: DESIGNATION_ACTIONS.GET_LIST });
    // //Create
//this.store.dispatch({ type: DESIGNATION_ACTIONS.ADD,payload:this.designationObj });
    // //Delete
//this.store.dispatch({ type: DESIGNATION_ACTIONS.DELETE,payload:"6aac273a-ab24-4959-8c93-6f52cfee56ff" });
    // //Update (PUT)
     //this.store.dispatch({ type: DESIGNATION_ACTIONS.UPDATE,payload:{id:"6aac273a-ab24-4959-8c93-6f52cfee56ff",updates:this.designationObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: DESIGNATION_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('designation').subscribe((res:any) => {
       this.designation = res;
     });
  }
}
