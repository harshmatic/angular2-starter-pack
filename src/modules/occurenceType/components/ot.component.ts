import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OT_ACTIONS } from '../store/occurenceType.actions';
import { Patch } from '../../patchReq.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../app/core/services/index';
import { OccurenceTypeService } from '../services/occurenceType.service';
@Component({
  moduleId: module.id,
  selector: 'app-occurence-type',
  templateUrl: 'ot.component.html',
})
export class OccurenceTypeComponent implements OnInit {
  occurenceType: any[];
  occurenceTypeObj: any = {};
  patchReq: Patch[] = [];
  otForm: FormGroup;
  isEdited: boolean = false;
  otID: any;
  otError: boolean = false;
  tableRows: number = 5;
  totalRecords: any = 0;
  public pageOptions: any = {pageNumber:1,pageSize:5};
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private occurenceTypeService: OccurenceTypeService) { }

  ngOnInit() {
    this.resetForm();
    this.patchReq.push({
      "op": "replace",
      "path": "/obTypeName",
      "value": "test after patch"
    });
    this.getOtList();
  }
  getOtList() {
    this.store.select('occurenceType').subscribe((res: any) => {
      if (res.ot && res.ot.length > 0) {
        this.occurenceType = res.ot;
        this.totalRecords = res.pagination.totalCount;
      }
    });
  }
  onEdit(OT: any) {
    this.otForm.controls['ot'].setValue(OT.obTypeName);
    this.isEdited = true;
    this.otID = OT.obTypeID;
  }
  resetForm() {
    this.otForm = this.formBuilder.group({
      ot: ['', [Validators.required]],
    });
  }
  onDelete(OT: any) {
    this.occurenceTypeService.deleteOt(OT.obTypeID)
      .subscribe((results: any) => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Occcurence type deleted' });
        this.resetForm();
        this.store.dispatch({ type: OT_ACTIONS.GET_LIST_BY_PAGINATION, payload: this.pageOptions });
        this.getOtList();
      });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.occurenceTypeObj = {
      "obTypeName": value.ot
    };
    if (!this.validate(value)) {
      if (this.isEdited) {
        this.occurenceTypeService.saveOt(this.otID, this.occurenceTypeObj)
          .subscribe((result: any) => {
            this.isEdited = false;
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Occurence type updated' });
            this.resetForm();
            this.store.dispatch({ type: OT_ACTIONS.GET_LIST_BY_PAGINATION, payload: this.pageOptions });
            this.getOtList();
          });
      }else if (!this.isEdited) {
        this.occurenceTypeService.addOt(this.occurenceTypeObj)
          .subscribe((result: any) => {
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Occurence type added' });
            this.resetForm();
            this.store.dispatch({ type: OT_ACTIONS.GET_LIST_BY_PAGINATION, payload: this.pageOptions });
            this.getOtList();
          });
      }
    }
  }
  validate(value: any) {
    let submitFlag = false;
    if (value.ot === "" || value.ot === undefined) {
      submitFlag = true;
      this.otError = true;
    } else { this.otError = false; }
    return submitFlag;
  }
  loadLazy(event: any) {
    let pageOptions: any = {};
    pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
    pageOptions.pageSize = event.rows;
    this.store.dispatch({ type: OT_ACTIONS.GET_LIST_BY_PAGINATION, payload: pageOptions });

  }
}
