import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { STATUS_ACTIONS } from '../../../status/store/status.actions';
import { Subscription } from 'rxjs/Subscription';
import { JobService } from '../../services/job.service';
import { OccurenceBookService } from '../../../occurenceBook/services/occurenceBook.service';
import { MessageService } from '../../../../app/core/services/index';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-edit',
  templateUrl: 'jobEdit.component.html',
})
export class JobEditComponent implements OnInit, OnDestroy {
  public selectedStatus:any;
  public obs: any = [];
  public comment: string = '';
  public status: any[] = [];
  public obId; any;
  public asyncOb: Observable<any>;
  public asyncStatus: Observable<any>;
  editJobForm: FormGroup;
  showTab: boolean = true;
  private subscriptions: Subscription = new Subscription();
  private sub: Subscription = new Subscription();
  queryString = '';
  constructor(private store: Store<OccurenceBook>, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder, private jobService: JobService,
    private occurenceBookService: OccurenceBookService,
    private messageService: MessageService) { }

  ngOnInit() {
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
        this.selectedStatus = res.statusID;
        console.log(this.obs);
      }
    })
    );
    this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST });
    this.asyncStatus = this.store.select('status');
    this.subscriptions.add(this.asyncStatus.subscribe((res: any) => {
      this.status = res;
      console.log("status =>" + this.status);
    })
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.sub.unsubscribe();
  }
  OnAssignOfficer() {
    this.router.navigate(['/officers/assign-officer'], { queryParams: { OccurenceBookID: this.obId } });
  }
  onStatusChange() {
    // this.occurenceBookService.updateStatusHistory(this.obId).subscribe(res => {
    //   console.log('Done');
    // });
  }
  onSubmit() {
    if (this.comment === '') {
      // let payload = {
      //   "obid": "411bfab2-0d44-4fb9-8835-184db90f5545",
      //   "areaID": "411bfab2-0d44-4fb9-8835-184db90f44fa",
      //   "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
      //   "departmentID": "a1da1d8e-1111-4634-b538-a01709472222",
      //   "mstStatus": null,
      //   "statusID": value.StatusID,
      //   "obNumber": "2456",
      //   "obTime": "2017-04-10T19:25:14.9100866",
      //   "caseFileNumber": "221",
      //   "natureOfOccurrence": "Nature 221",
      //   "remark": "Test Remark 221",
      //   "assignedTO": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
      //   "assignedComments": value.comment,
      //   "MapZoomLevel": 10,
      //   "Lattitude": 18.555905,
      //   "Longitude": 73.805589,
      //   "Location": "Near Agarrwal Packers and Movers"
      // }
      this.obs.mstStatus = null;
      this.obs.statusID = this.selectedStatus;
      this.jobService.addJob(this.obs).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status Saved' });
        console.log('Done');
      });
    } else {
      let payload = {
        "OBID": this.obId,
        "ReveiwComments": this.comment
      };
      this.occurenceBookService.addReview(payload).subscribe(res => {
         this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Comment Saved' });
        console.log('Done');
      });
    }



  }
}
