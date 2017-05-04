import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { OccurenceBook } from '../../../occurenceBook/store/occurenceBook.model';
import { OB_ACTIONS } from '../../../occurenceBook/store/occurenceBook.actions';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-job-detail',
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
  templateUrl: 'jobDetail.component.html',
})
export class JobDetailComponent implements OnInit{
  jobPageNum:number=1;
  stopScroll=false
  obs: any[] = [];
  asyncOb: Observable<any>
  showTab: boolean = true;
  private subscriptions: Subscription = new Subscription();
  queryString = '';
  constructor(private store: Store<OccurenceBook>, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    //this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: "" } });
    this.getJobs();
    this.asyncOb = this.store.select('occurenceBook');
<<<<<<< HEAD
    this.subscriptions.add(this.asyncOb.subscribe((res: any) => {
      if (Object.keys(res).length>0) {
      this.obs = res;
      console.log("objectDetailsaaa=>",res);
=======
    this.asyncOb.subscribe((res: any) => {
     // this.obs = res;
       for(let i=0;i<res.length;i++){
         this.obs.push(res[i]);
      }
      if(res.length>0){
        this.jobPageNum++;
        this.stopScroll = false;
      }else{
        this.stopScroll = true;
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
      }
    })

  }

  onKey(event: any) {
<<<<<<< HEAD
    this.queryString = event.target.value;
    this.store.dispatch({ type: OB_ACTIONS.GET_LIST, payload: { search: this.queryString } });

  }
  onOBClick(id: any) {
    this.router.navigate(['/jobs/jobEdit'], { queryParams: { OccurenceBookID: id } });
  }
  onCreateJob(){
    this.router.navigate(['/jobs/addJob']);
  }

=======
       this.stopScroll =false;
       this.obs=[]
       this.queryString = event.target.value;
       this.jobPageNum=1;
       this.getJobs()
  }
  getJobs(){
    if(!this.stopScroll && this.jobPageNum>0) {
       this.store.dispatch({ 
         type: OB_ACTIONS.GET_LIST,
         payload:{ search: this.queryString, pageNum:this.jobPageNum,pageSize:5 }
      });
    }
  }
>>>>>>> 06dd07b675f32cc5a0c6898b0b82c21f294c05fd
}
