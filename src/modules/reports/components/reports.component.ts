import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { REPORTS_ACTIONS } from '../store/reports.actions';
import { Patch } from '../../patchReq.model';
@Component({
  moduleId: module.id,
  selector: 'app-reports',
  templateUrl: 'reports.component.html',
})
export class ReportsComponent {
  occurenceTypeObj:any = {};
  patchReq:Patch[]=[];
  constructor(private store: Store<any>){}

  
}
