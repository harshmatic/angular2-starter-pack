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
  public selectedOfficer: any;
  public remark: any;
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

    this.store.dispatch({ type: OB_ACTIONS.GET_OB, payload: { id: this.obId } });
    this.asyncOb = this.store.select('occurenceBook');
    this.subscriptions.add(this.asyncOb.subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        this.obs = res;
        this.selectedDept = res.departmentID;
        this.selectedArea = res.areaID;
        this.selectedRank = res.mstEmployee ? res.mstEmployee.designationID : '';
        this.selectedOfficer = res.mstEmployee ? res.mstEmployee.employeeID : '';
        this.remark = res.remark;
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
        }

      });
    }
  }
  onBack() {
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: this.obId } });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (!this.validate(value)) {
      this.obs.assignedTO = value.officerID;
      this.obs.assignedComments = value.remark;
      this.jobService.updateOfficer(this.obs).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Officer assigned successfully' });
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
    if (value.remark === "" || value.remark === undefined) {
      submitFlag = true;
      this.RemarkError = true;
    } else { this.RemarkError = false; }
    return submitFlag;
  }
}
