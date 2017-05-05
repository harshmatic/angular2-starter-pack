import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Employee } from '../../../employee/store/employee.model';
import { EMPLOYEE_ACTIONS } from '../../../employee/store/employee.actions';
import { DEPARTMENT_ACTIONS } from '../../../department/store/department.actions';
import { JobService } from '../../../job/services/job.service';
import { Subscription } from 'rxjs/Subscription';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { AREA_ACTIONS } from '../../../area/store/area.actions';
import { DESIGNATION_ACTIONS } from '../../../designation/store/designation.actions';
import { MessageService } from '../../../../app/core/services/index';

declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  templateUrl: 'assignOfficer.component.html',
  styleUrls: ['assignOfficer.component.css']
})
export class AssignOfficerComponent implements OnInit, OnDestroy {
  public selectedDept: any;
  public selectedArea: any;
  public selectedRank: any;
  vehStartTime: Date;
  officers: any[] = [];
  public obs: any = [];
  departments: any[] = [];
  areas: any[] = [];
  ranks: any[] = [];
  asyncOfficer: Observable<any>;
  asyncdepartment: Observable<any>;
  asyncArea: Observable<any>;
  asyncRank: Observable<any>;
  public asyncOb: Observable<any>;
  showTab: boolean = true;
  assignOfficerForm: FormGroup;
  depError: boolean = false;
  rankError: boolean = false;
  offError: boolean = false;
  vehAllotmentError: boolean = false;
  startTimeError: boolean = false;
  posError: boolean = false;
  weaponError: boolean = false;
  collectionError: boolean = false;
  posTimeError: boolean = false;
  RemarkError: boolean = false;
  areaError: boolean = false;
  public obId; any;
  private sub: Subscription = new Subscription();
  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<Employee>, private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router, private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit() {

    this.assignOfficerForm = this.formBuilder.group({
      // Id: [null],
      departmentID: ['', Validators.required],
      areaID: ['', Validators.required],
      rankID: ['', [Validators.required]],
      officerID: ['', [Validators.required]],
      VehicleID: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      WeaponAllotment: ['', [Validators.required]],
      collectionTime: ['', [Validators.required]],
      PossessionTime: ['', [Validators.required]],
      remark: ['', [Validators.required]],
    });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.obId = params['OccurenceBookID'];
      });

    this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { id: this.obId } });
    this.asyncOb = this.store.select('occurenceBook');
    this.subscriptions.add(this.asyncOb.subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.obs = res;
        this.selectedDept = res.departmentID;
        this.selectedArea = res.areaID;
        this.selectedRank = res.mstEmployee.designationID;
        //console.log("obj=>", this.obs);
        this.getOfficer();
      }

    })
    );

    this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    this.asyncdepartment = this.store.select('department');
    this.asyncdepartment.subscribe((res: any) => {
      this.departments = res;
    });

    this.store.dispatch({ type: AREA_ACTIONS.GET_LIST });
    this.asyncArea = this.store.select('area');
    this.asyncArea.subscribe((res: any) => {
      this.areas = res;
    });

    this.store.dispatch({ type: DESIGNATION_ACTIONS.GET_LIST });
    this.asyncRank = this.store.select('designation');
    this.asyncRank.subscribe((res: any) => {
      this.ranks = res;
    });
  }
  getOfficer() {
    let value = {
      "areaID": this.selectedArea,
      "departmentID": this.selectedDept,
      "rankID": this.selectedRank
    }
    this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST_BY_DEPT, payload: { id: value } });
    this.asyncOfficer = this.store.select('employee');
    this.asyncOfficer.subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.officers = res;
        //console.log("designation=>", this.officers);
      }

    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subscriptions.unsubscribe();
  }
  selectDept({ value, valid }: { value: any, valid: boolean }) {
    if (value.departmentID !== '' && value.areaID !== '' && value.rankID !== '') {
      this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST_BY_DEPT, payload: { id: value } });
      this.asyncOfficer = this.store.select('employee');
      this.asyncOfficer.subscribe((res: any) => {
        if (Object.keys(res).length > 0) {
          this.officers = res;
          //console.log("designation=>", this.officers);
        }

      });
    }
  }
  onBack(){
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: this.obId } });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!this.validate(value)) {
      // let payload = {
      //   "areaID": "411bfab2-0d44-4fb9-8835-184db90f44fa",
      //   "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
      //   "departmentID": "a1da1d8e-1111-4634-b538-a01709472222",
      //   "mstStatus": null,
      //   "statusID": "ebeed096-ea34-43e2-948e-32bb98f31401",
      //   "obNumber": "2456",
      //   "obTime": "2017-04-10T19:25:14.9100866",
      //   "caseFileNumber": "221",
      //   "natureOfOccurrence": "Nature 221",
      //   "remark": "Test Remark 221",
      //   "assignedTO": value.officerID,
      //   "assignedComments": value.remark,
      //   "MapZoomLevel": 10,
      //   "Lattitude": 18.555905,
      //   "Longitude": 73.805589,
      //   "Location": "Near Agarrwal Packers and Movers"
      // }
      this.obs.assignedTO = value.officerID;
      this.obs.assignedComments = value.remark;
      this.jobService.updateOfficer(this.obs).subscribe(res => {
        //console.log('Done');
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
        //this.router.navigate(['/jobs/jobDetails']);
        this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: this.obId } });
      })
    }

  }
  validate(value: any) {
    let submitFlag = false;
    if (value.departmentID === "" || value.departmentID === undefined) {
      submitFlag = true;
      this.depError = true;
    } else { this.depError = false; }
    if (value.areaID === "" || value.areaID === undefined) {
      submitFlag = true;
      this.areaError = true;
    } else { this.areaError = false; }
    if (value.rankID === "" || value.rankID === undefined) {
      submitFlag = true;
      this.rankError = true;
    } else { this.rankError = false; }
    if (value.officerID === "" || value.officerID === undefined) {
      submitFlag = true;
      this.offError = true;
    } else { this.offError = false; }
    if (value.VehicleID === "" || value.VehicleID === undefined) {
      submitFlag = true;
      this.vehAllotmentError = true;
    } else { this.vehAllotmentError = false; }
    // if (value.startTime === "" || value.startTime === undefined) {
    //   submitFlag = true;
    //   this.startTimeError = true;
    // } else { this.startTimeError = false; }
    // if (value.endTime === "" || value.endTime === undefined) {
    //   submitFlag = true;
    //   this.posError = true;
    // } else { this.posError = false; }
    if (value.WeaponAllotment === "" || value.WeaponAllotment === undefined) {
      submitFlag = true;
      this.weaponError = true;
    } else { this.weaponError = false; }
    // if (value.collectionTime === "" || value.collectionTime === undefined) {
    //   submitFlag = true;
    //   this.collectionError = true;
    // } else { this.collectionError = false; }
    // if (value.PossessionTime === "" || value.PossessionTime === undefined) {
    //   submitFlag = true;
    //   this.posTimeError = true;
    // } else { this.posTimeError = false; }
    if (value.remark === "" || value.remark === undefined) {
      submitFlag = true;
      this.RemarkError = true;
    } else { this.RemarkError = false; }
    return submitFlag;
  }
}
