import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SHIFT_ACTIONS } from '../../store/shift.actions';
import { Patch } from '../../../patchReq.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../../app/core/services/index';
import { ShiftService } from '../../services/shift.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-shift-add',
  templateUrl: 'shiftAddEdit.component.html',
})
export class ShiftAddEditComponent implements OnInit {
  shift: any[];
  shiftObj: any = {};
  patchReq: Patch[] = [];
  shiftForm: FormGroup;
  isEdited: boolean = false;
  shiftID: any;
  shiftError: boolean = false;
  startTimeError: boolean = false;
  endTimeError: boolean = false;
  public date4: Date;
  params: any;
  constructor(private store: Store<any>,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private shiftService: ShiftService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();
    this.patchReq.push({
      "op": "replace",
      "path": "/shiftName",
      "value": "test after patch"
    });
    this.route.params.forEach((params: Params) => {
      this.params = params['shiftId'];
      console.log(this.params)
      if (this.params) {
        this.getShift();
      }
    });
  }
  getShift() {
    this.shiftService.getShift(this.params)
      .subscribe((result: any) => {
        this.shiftForm.controls['shiftName'].setValue(result.shiftName);
        this.shiftForm.controls['monStartTime'].setValue(new Date("2017-05-18T" + result.mondayStartTime));
        this.shiftForm.controls['monEndTime'].setValue(new Date("2017-05-18T" + result.mondayEndTime));
        this.shiftForm.controls['tueStartTime'].setValue(new Date("2017-05-18T" + result.tuesdayStartTime));
        this.shiftForm.controls['tueEndTime'].setValue(new Date("2017-05-18T" + result.tuesdayEndTime));
        this.shiftForm.controls['wedStartTime'].setValue(new Date("2017-05-18T" + result.wednesdayStartTime));
        this.shiftForm.controls['wedEndTime'].setValue(new Date("2017-05-18T" + result.wednesdayEndTime));
        this.shiftForm.controls['thuStartTime'].setValue(new Date("2017-05-18T" + result.thursdayStartTime));
        this.shiftForm.controls['thuEndTime'].setValue(new Date("2017-05-18T" + result.thursdayEndTime));
        this.shiftForm.controls['friStartTime'].setValue(new Date("2017-05-18T" + result.fridayStartTime));
        this.shiftForm.controls['friEndTime'].setValue(new Date("2017-05-18T" + result.fridayEndTime));
        this.shiftForm.controls['satStartTime'].setValue(new Date("2017-05-18T" + result.saturdayStartTime));
        this.shiftForm.controls['satEndTime'].setValue(new Date("2017-05-18T" + result.saturdayEndTime));
        this.shiftForm.controls['sunStartTime'].setValue(new Date("2017-05-18T" + result.sundayStartTime));
        this.shiftForm.controls['sunEndTime'].setValue(new Date("2017-05-18T" + result.sundayEndTime));
        this.isEdited = true;
        this.shiftID = result.shiftID;
      });
  }
  resetForm() {
    this.shiftForm = this.formBuilder.group({
      shiftName: ['', [Validators.required]],
      monStartTime: ['', [Validators.required]],
      monEndTime: ['', [Validators.required]],
      tueStartTime: ['', [Validators.required]],
      tueEndTime: ['', [Validators.required]],
      wedStartTime: ['', [Validators.required]],
      wedEndTime: ['', [Validators.required]],
      thuStartTime: ['', [Validators.required]],
      thuEndTime: ['', [Validators.required]],
      friStartTime: ['', [Validators.required]],
      friEndTime: ['', [Validators.required]],
      satStartTime: ['', [Validators.required]],
      satEndTime: ['', [Validators.required]],
      sunStartTime: ['', [Validators.required]],
      sunEndTime: ['', [Validators.required]]
    });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.shiftObj = {
      "shiftName": value.shiftName,
      "mondayStartTime": value.monStartTime !== '' ? value.monStartTime.getHours() + ":" + value.monStartTime.getMinutes() + ":" + value.monStartTime.getSeconds() : value.monStartTime,
      "mondayEndTime": value.monEndTime !== '' ? value.monEndTime.getHours() + ":" + value.monEndTime.getMinutes() + ":" + value.monEndTime.getSeconds() : value.monEndTime,
      "tuesdayStartTime": value.tueStartTime !== '' ? value.tueStartTime.getHours() + ":" + value.tueStartTime.getMinutes() + ":" + value.tueStartTime.getSeconds() : value.tueStartTime,
      "tuesdayEndTime": value.tueEndTime !== '' ? value.tueEndTime.getHours() + ":" + value.tueEndTime.getMinutes() + ":" + value.tueEndTime.getSeconds() : value.tueEndTime,
      "wednesdayStartTime": value.wedStartTime !== '' ? value.wedStartTime.getHours() + ":" + value.wedStartTime.getMinutes() + ":" + value.wedStartTime.getSeconds() : value.wedStartTime,
      "wednesdayEndTime": value.wedEndTime !== '' ? value.wedEndTime.getHours() + ":" + value.wedEndTime.getMinutes() + ":" + value.wedEndTime.getSeconds() : value.wedEndTime,
      "thursdayStartTime": value.thuStartTime !== '' ? value.thuStartTime.getHours() + ":" + value.thuStartTime.getMinutes() + ":" + value.thuStartTime.getSeconds() : value.thuStartTime,
      "thursdayEndTime": value.thuEndTime !== '' ? value.thuEndTime.getHours() + ":" + value.thuEndTime.getMinutes() + ":" + value.thuEndTime.getSeconds() : value.thuEndTime,
      "fridayStartTime": value.friStartTime !== '' ? value.friStartTime.getHours() + ":" + value.friStartTime.getMinutes() + ":" + value.friStartTime.getSeconds() : value.friStartTime,
      "fridayEndTime": value.friEndTime !== '' ? value.friEndTime.getHours() + ":" + value.friEndTime.getMinutes() + ":" + value.friEndTime.getSeconds() : value.friEndTime,
      "saturdayStartTime": value.satStartTime !== '' ? value.satStartTime.getHours() + ":" + value.satStartTime.getMinutes() + ":" + value.satStartTime.getSeconds() : value.satStartTime,
      "saturdayEndTime": value.satEndTime !== '' ? value.satEndTime.getHours() + ":" + value.satEndTime.getMinutes() + ":" + value.satEndTime.getSeconds() : value.satEndTime,
      "sundayStartTime": value.sunStartTime !== '' ? value.sunStartTime.getHours() + ":" + value.sunStartTime.getMinutes() + ":" + value.sunStartTime.getSeconds() : value.sunStartTime,
      "sundayEndTime": value.sunEndTime !== '' ? value.sunEndTime.getHours() + ":" + value.sunEndTime.getMinutes() + ":" + value.sunEndTime.getSeconds() : value.sunEndTime,
    }
    //if (!this.validate(value)) {
    if (this.isEdited) {
      this.shiftService.saveShift(this.shiftID, this.shiftObj)
        .subscribe((result: any) => {
          this.isEdited = false;
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Updated' });
          this.resetForm();
          this.router.navigate(['/shift/shift-list']);
        });
    } else if (!this.isEdited) {
      this.shiftService.addShift(this.shiftObj)
        .subscribe((result: any) => {
          this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Shift Added' });
          this.resetForm();
          this.router.navigate(['/shift/shift-list']);
        });
    }
    //}
  }
  validate(value: any) {
    let submitFlag = false;
    if (value.shiftName === "" || value.shiftName === undefined) {
      submitFlag = true;
      this.shiftError = true;
    } else { this.shiftError = false; }
    if (value.startTime === "" || value.startTime === undefined) {
      submitFlag = true;
      this.startTimeError = true;
    } else { this.startTimeError = false; }
    if (value.endTime === "" || value.endTime === undefined) {
      submitFlag = true;
      this.endTimeError = true;
    } else { this.endTimeError = false; }
    return submitFlag;
  }

}
