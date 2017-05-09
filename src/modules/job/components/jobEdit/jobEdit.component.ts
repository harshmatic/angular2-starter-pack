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
import { Priority } from '../../../config';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-edit',
  templateUrl: 'jobEdit.component.html',
  styleUrls: ['jobEdit.component.css']
})
export class JobEditComponent implements OnInit, OnDestroy {
  public selectedStatus: any;
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
      }
    })
    );
    this.store.dispatch({ type: STATUS_ACTIONS.GET_LIST });
    this.asyncStatus = this.store.select('status');
    this.subscriptions.add(this.asyncStatus.subscribe((res: any) => {
      this.status = res;
    })
    );

  }
  applyIcon(priority) {
    for (var key in Priority) {
      if (key == priority) {
        return "/assets/styles/images/"+Priority[key]+".svg";
      } else {
        return "/assets/styles/images/blue.svg";
      }
    }
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
      this.obs.mstStatus = null;
      this.obs.statusID = this.selectedStatus;
      this.jobService.updateOfficer(this.obs).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status updated' });
      });
    } else {
      let payload = {
        "OBID": this.obId,
        "ReveiwComments": this.comment
      };
      this.obs.mstStatus = null;
      this.obs.statusID = this.selectedStatus;
      this.jobService.updateOfficer(this.obs).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status and comment saved' });
      });
      this.occurenceBookService.addReview(payload).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Comment saved' });
      });
    }



  }
}
