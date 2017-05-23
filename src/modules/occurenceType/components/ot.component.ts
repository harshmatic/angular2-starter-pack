import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceType } from '../store/occurenceType.model';
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
  occurenceType: OccurenceType[];
  occurenceTypeObj: any = {};
  patchReq: Patch[] = [];
  otForm: FormGroup;
  isEdited: boolean = false;
  otID: any;
  otError: boolean = false;
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private occurenceTypeService: OccurenceTypeService) { }

  ngOnInit() {
    this.resetForm();
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
      "op": "replace",
      "path": "/obTypeName",
      "value": "test after patch"
    });

    // //Create
    // this.store.dispatch({ type: OT_ACTIONS.ADD,payload:this.occurenceTypeObj });
    // //Delete
    //this.store.dispatch({ type: OT_ACTIONS.DELETE,payload:"758b1995-7f92-4d87-9588-b90800abf111" });
    // //Update (PUT)
    //this.store.dispatch({ type: OT_ACTIONS.UPDATE,payload:{id:"758b1995-7f92-4d87-9588-b90800abf111",updates:this.occurenceTypeObj}});
    // //Update (PATCH)

    // this.store.dispatch({ type: OT_ACTIONS.UPDATE,payload:{id:"758b1995-7f92-4d87-9588-b90800abf111",updates:this.patchReq}});
    this.getOtList();
  }
  getOtList() {
    this.store.dispatch({ type: OT_ACTIONS.GET_LIST });
    this.store.select('occurenceType').subscribe((res: any) => {
      this.occurenceType = res;
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
            this.getOtList();
          });
      }else if (!this.isEdited) {
        this.occurenceTypeService.addOt(this.occurenceTypeObj)
          .subscribe((result: any) => {
            this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Occurence type added' });
            this.resetForm();
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
}
