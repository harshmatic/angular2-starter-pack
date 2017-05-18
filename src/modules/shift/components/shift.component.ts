import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Shift } from '../store/shift.model';
import { SHIFT_ACTIONS } from '../store/shift.actions';
import { Patch } from '../../patchReq.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../app/core/services/index';
import { ShiftService } from '../services/shift.service';
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
  public date4: Date;
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private shiftService: ShiftService) { }

  ngOnInit() {
    this.resetForm();
    // this.shiftObj = {
    //   "shiftID": "318dc4df-684a-444f-9e5a-18bb5eed1123",
    //   "shiftName": "Shift1 - Updated",
    //   "startTime": "00:01:20",
    //   "endTime": "00:01:05",
    // }
    this.patchReq.push({
      "op": "replace",
      "path": "/shiftName",
      "value": "test after patch"
    });
    // //Create
    // this.store.dispatch({ type: SHIFT_ACTIONS.ADD,payload:this.shiftObj });
    // //Delete
    //this.store.dispatch({ type: SHIFT_ACTIONS.DELETE,payload:"318dc4df-684a-444f-9e5a-18bb5eed1123" });
    // //Update (PUT)
    // this.store.dispatch({ type: SHIFT_ACTIONS.UPDATE,payload:{id:"318dc4df-684a-444f-9e5a-18bb5eed1123",updates:this.shiftObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: SHIFT_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.getShiftList();
  }
  getShiftList() {
    this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST });
    this.store.select('shift').subscribe((res: any) => {
      if (res.length > 0) {
        this.shift = res;
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
    this.shiftForm.controls['shiftName'].setValue(shift.shiftName);
    this.shiftForm.controls['startTime'].setValue(new Date("2017-05-18T"+shift.startTime));
    this.shiftForm.controls['endTime'].setValue(new Date("2017-05-18T"+shift.endTime));
    this.isEdited = true;
    this.shiftID = shift.shiftID;
  }
  onDelete(shift: any) {
    this.shiftService.deleteShift(shift.shiftID)
      .subscribe((results: any) => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Deleted' });
        this.resetForm();
        this.getShiftList();
      });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.shiftObj = {
      "shiftName": value.shiftName,
      "startTime": value.startTime.getHours() + ":" + value.startTime.getMinutes() + ":" + value.startTime.getSeconds(),
      "endTime": value.endTime.getHours() + ":" + value.endTime.getMinutes() + ":" + value.endTime.getSeconds(),
    }
    if (this.isEdited) {
      this.shiftService.saveShift(this.shiftID, this.shiftObj)
        .subscribe((result: any) => {
          this.isEdited = false;
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Updated' });
          this.resetForm();
          this.getShiftList();
        });
    }
    if (!this.isEdited) {
      this.shiftService.addShift(this.shiftObj)
        .subscribe((result: any) => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Added' });
          this.resetForm();
          this.getShiftList();
        });
    }
  }
}
