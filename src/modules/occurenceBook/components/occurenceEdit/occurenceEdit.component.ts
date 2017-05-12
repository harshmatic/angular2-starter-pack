import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { STATUS_ACTIONS } from '../../../status/store/status.actions';
import { Subscription } from 'rxjs/Subscription';
import { OccurenceBookService } from '../../services/occurenceBook.service';
import { MessageService } from '../../../../app/core/services/index';
import { Priority } from '../../../config';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-edit',
  templateUrl: 'occurenceEdit.component.html',
  styleUrls: ['occurenceEdit.component.css']
})
export class OccurenceEditComponent implements OnInit, OnDestroy {
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
    private formBuilder: FormBuilder,
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
  //Color Coding
  applyPriority(priority) {
    for (var key in Priority) {
      if (Priority.hasOwnProperty(priority)) {
        return Priority[priority];
      } else {
        return "blue";
      }
    }
  }
  applyIcon(priority) {
    for (var key in Priority) {
      if (Priority.hasOwnProperty(priority)) {
        return "/assets/styles/images/" + Priority[priority] + ".svg";
      } else {
        return "/assets/styles/images/blue.svg";
      }
    }

  }
  onViewActivity() {
    this.router.navigate(['/ob/viewActivity'], { queryParams: { OccurenceBookID: this.obId } });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.sub.unsubscribe();
  }
  OnAssignOfficer() {
    this.router.navigate(['/employee/assign-officer'], { queryParams: { OccurenceBookID: this.obId } });
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
      this.occurenceBookService.updateOfficer(this.obs).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status updated' });
      });
    } else {
      let payload = {
        "OBID": this.obId,
        "ReveiwComments": this.comment
      };
      this.obs.mstStatus = null;
      this.obs.statusID = this.selectedStatus;
      this.occurenceBookService.updateOfficer(this.obs).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Status and comment saved' });
      });
      this.occurenceBookService.addReview(payload).subscribe(res => {
        this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Comment saved' });
      });
    }



  }
}
