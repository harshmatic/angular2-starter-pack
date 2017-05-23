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
  tableRows: number = 5;
  totalRecords: any = 0;
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private statusService: StatusService) { }

  ngOnInit() {

    this.resetForm();
    this.patchReq.push({
      "op": "replace",
      "path": "/statusName",
      "value": "statusName after patch"
    });
    this.getStatusList();

  }
  getStatusList() {
    this.store.select('status').subscribe((res: any) => {
      if (res.status && res.status.length > 0) {
        this.status = res.status;
        this.totalRecords = res.pagination.totalCount;
      }
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
      } else if (!this.isEdited) {
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
  loadLazy(event: any) {
    let pageOptions: any = {};
    pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
    pageOptions.pageSize = event.rows;
    this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST_BY_PAGINATION, payload: pageOptions });

  }
}
