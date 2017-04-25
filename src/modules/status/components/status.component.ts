import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Status } from '../store/status.model';
import { STATUS_ACTIONS } from '../store/status.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-status',
  templateUrl: 'status.component.html',
})
export class StatusComponent  implements OnInit {
  status:Status[];
  statusObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.statusObj = {
    "statusID": "ebeed096-ea34-43e2-948e-32bb98f31401",
    "statusName": "Assigned - Updated",
    "createdOn": "2017-04-21T19:13:44.9224057",
    "createdBy": "00000000-0000-0000-0000-000000000000",
    "updatedOn": "0001-01-01T00:00:00",
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false
  }
  this.patchReq.push({
    "op":"replace",
	"path":"/statusName",
	"value":"statusName after patch"
  });
    this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST });
  
    this.store.dispatch({ type: STATUS_ACTIONS.DELETE,payload:"411bfab2-0d44-4fb9-8835-184db90f5678" });
   
    this.store.select('status').subscribe((res:any) => {
       this.status = res;
     });
  }
}
