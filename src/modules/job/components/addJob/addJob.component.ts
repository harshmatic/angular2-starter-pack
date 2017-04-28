import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DEPARTMENT_ACTIONS } from '../../../department/store/department.actions';
import { OT_ACTIONS } from '../../../occurenceType/store/occurenceType.actions';
import { JobService } from '../../services/job.service';

declare var $:any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  templateUrl: 'addJob.component.html',
})
export class AddJobComponent  implements OnInit {
  departments:any[]=[];
  asyncdepartment:Observable<any>;
  occurrenceTypes:any[]=[];
  asyncOT:Observable<any>
  jobForm: FormGroup;
  constructor(private store: Store<any>, private formBuilder: FormBuilder,
  private jobService: JobService){}

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
            Id: [null],
            departmentID: ['', [Validators.required]],
            obTypeID: ['', [Validators.required]],
            obTime: ['', [Validators.required]],
            natureOfOccurrence: ['', [Validators.required]],
            remark: [''],
    });
    this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    this.store.dispatch({ type: OT_ACTIONS.GET_LIST });
    
    this.asyncdepartment= this.store.select('department')
    this.asyncdepartment.subscribe((res:any) => {
       this.departments = res;
    });
    this.asyncOT= this.store.select('occurenceType')
    this.asyncOT.subscribe((res:any) => {
       this.occurrenceTypes = res;
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }){
      let payload = {
          "areaID": "411bfab2-0d44-4fb9-8835-184db90f44fa",
          "obNumber": "987",
          "departmentID":value.departmentID,
          "statusID": "ebeed096-ea34-43e2-948e-32bb98f31401",
          "natureOfOccurrence":value.natureOfOccurrence,
          "obTime":"2017-04-10T19:25:14.9100866",
          "obTypeID":value.obTypeID,
          "caseFileNumber": "2",
          "remark":value.remark,
          "lattitude": 18.550335,
          "longitude": 73.809956,
          "assignedTime": "2017-04-27T06:24:58.6589837",
          "assignedTO": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
          "assignedComments": "Assigned to SAIG in CID",
          "mapZoomLevel": 11,
          "location": "Near IARIRS Baner"
    }
    this.jobService.addJob(payload).subscribe(res=>{
      console.log('Done')
    })
  }
}
