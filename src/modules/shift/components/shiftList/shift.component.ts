import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Shift } from '../../store/shift.model';
import { SHIFT_ACTIONS } from '../../store/shift.actions';
import { Patch } from '../../../patchReq.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../../app/core/services/index';
import { ShiftService } from '../../services/shift.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-shift',
  templateUrl: 'shift.component.html',
})
export class ShiftComponent implements OnInit {
  shift: Shift[];
  shiftObj: any = {};
  patchReq: Patch[] = [];
  shiftForm: FormGroup;
  isEdited: boolean = false;
  shiftID: any;
  shiftError: boolean = false;
  startTimeError: boolean = false;
  endTimeError: boolean = false;
  public date4: Date;
  tableRows: number = 5;
  totalRecords: any = 0;
  public pageOptions: any = { pageNumber: 1, pageSize: 5 };
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private shiftService: ShiftService,
    private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.patchReq.push({
      "op": "replace",
      "path": "/shiftName",
      "value": "test after patch"
    });
    this.getShiftList();
  }
  getShiftList() {
    this.store.select('shift').subscribe((res: any) => {
      if (res.shift && res.shift.length > 0) {
        this.shift = res.shift;
        this.totalRecords = res.pagination.totalCount;
      }
    });
  }
  resetForm() {
    this.shiftForm = this.formBuilder.group({
      shiftName: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]]
    });
  }
  onEdit(shift: any) {
    this.router.navigate(['/shift/shift-AddEdit', shift.shiftID]);
    // this.shiftForm.controls['shiftName'].setValue(shift.shiftName);
    // this.shiftForm.controls['startTime'].setValue(new Date("2017-05-18T" + shift.startTime));
    // this.shiftForm.controls['endTime'].setValue(new Date("2017-05-18T" + shift.endTime));
    // this.isEdited = true;
    // this.shiftID = shift.shiftID;

  }
  onDelete(shift: any) {
    this.shiftService.deleteShift(shift.shiftID)
      .subscribe((results: any) => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Deleted' });
        this.resetForm();
        this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST_BY_PAGINATION, payload: this.pageOptions });
        this.getShiftList();
      });
  }
  // onSubmit({ value, valid }: { value: any, valid: boolean }) {
  //   this.shiftObj = {
  //     "shiftName": value.shiftName,
  //     "startTime": value.startTime !== '' ? value.startTime.getHours() + ":" + value.startTime.getMinutes() + ":" + value.startTime.getSeconds() : value.startTime,
  //     "endTime": value.endTime !== '' ? value.endTime.getHours() + ":" + value.endTime.getMinutes() + ":" + value.endTime.getSeconds() : value.endTime,
  //   }
  //   if (!this.validate(value)) {
  //     if (this.isEdited) {
  //       this.shiftService.saveShift(this.shiftID, this.shiftObj)
  //         .subscribe((result: any) => {
  //           this.isEdited = false;
  //           this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Updated' });
  //           this.resetForm();
  //           this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST_BY_PAGINATION, payload: this.pageOptions });
  //           this.getShiftList();
  //         });
  //     } else if (!this.isEdited) {
  //       this.shiftService.addShift(this.shiftObj)
  //         .subscribe((result: any) => {
  //           this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Added' });
  //           this.resetForm();
  //           this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST_BY_PAGINATION, payload: this.pageOptions });
  //           this.getShiftList();
  //         });
  //     }
  //   }
  // }
  // validate(value: any) {
  //   let submitFlag = false;
  //   if (value.shiftName === "" || value.shiftName === undefined) {
  //     submitFlag = true;
  //     this.shiftError = true;
  //   } else { this.shiftError = false; }
  //   if (value.startTime === "" || value.startTime === undefined) {
  //     submitFlag = true;
  //     this.startTimeError = true;
  //   } else { this.startTimeError = false; }
  //   if (value.endTime === "" || value.endTime === undefined) {
  //     submitFlag = true;
  //     this.endTimeError = true;
  //   } else { this.endTimeError = false; }
  //   return submitFlag;
  // }
  loadLazy(event: any) {
    let pageOptions: any = {};
    pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
    pageOptions.pageSize = event.rows;
    this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST_BY_PAGINATION, payload: pageOptions });
  }
}
