import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Status } from '../../store/status.model';
import { STATUS_ACTIONS } from '../../store/status.actions';
import { Patch } from '../../../patchReq.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../../app/core/services/index';
import { StatusService } from '../../services/status.service';
@Component({
  moduleId: module.id,
  selector: 'app-status',
  templateUrl: 'status.component.html',
})
export class StatusComponent implements OnInit {
  status: Status[];
  statusObj: any = {};
  patchReq: Patch[] = [];
  statusForm: FormGroup;
  isEdited: boolean = false;
  statusID: any;
  statusError: boolean = false;
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private statusService: StatusService) { }

  ngOnInit() {
    this.resetForm();
    // this.statusObj = {
    //   "statusID": "ebeed096-ea34-43e2-948e-32bb98f31401",
    //   "statusName": "Assigned - Updated",
    //   "createdOn": "2017-04-21T19:13:44.9224057",
    //   "createdBy": "00000000-0000-0000-0000-000000000000",
    //   "updatedOn": "0001-01-01T00:00:00",
    //   "updatedBy": "00000000-0000-0000-0000-000000000000",
    //   "isDelete": false
    // }
    this.patchReq.push({
      "op": "replace",
      "path": "/statusName",
      "value": "statusName after patch"
    });

    // //Create
    // this.store.dispatch({ type: STATUS_ACTIONS.ADD,payload:this.statusObj });
    // //Delete
    // this.store.dispatch({ type: STATUS_ACTIONS.DELETE,payload:"ebeed096-ea34-43e2-948e-32bb98f31401" });
    // //Update (PUT)
    //this.store.dispatch({ type: STATUS_ACTIONS.UPDATE,payload:{id:"ebeed096-ea34-43e2-948e-32bb98f31401",updates:this.statusObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: STATUS_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.getStatusList();
  }
  getStatusList() {
    this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST });
    this.store.select('status').subscribe((res: any) => {
        this.status = res;
    });
  }
  resetForm() {
    this.statusForm = this.formBuilder.group({
      statusName: ['', [Validators.required]],
    });
  }
  onEdit(status: any) {
    this.statusForm.controls['statusName'].setValue(status.statusName);
    this.isEdited = true;
    this.statusID = status.statusID;
  }
  onDelete(status: any) {
    this.statusService.deleteStatus(status.statusID)
      .subscribe((results: any) => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status Deleted' });
        this.resetForm();
        this.getStatusList();
      });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.statusObj = {
      "statusName": value.statusName,
    };
    if (!this.validate(value)) {
      if (this.isEdited) {
        this.statusService.saveStatus(this.statusID, this.statusObj)
          .subscribe((result: any) => {
            this.isEdited = false;
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status Updated' });
            this.resetForm();
            this.getStatusList();
          });
      }else if (!this.isEdited) {
        this.statusService.addStatus(this.statusObj)
          .subscribe((result: any) => {
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status Added' });
            this.resetForm();
            this.getStatusList();
          });
      }
    }
  }
  validate(value: any) {
    let submitFlag = false;
    if (value.statusName === "" || value.statusName === undefined) {
      submitFlag = true;
      this.statusError = true;
    } else { this.statusError = false; }
    return submitFlag;
  }
}
