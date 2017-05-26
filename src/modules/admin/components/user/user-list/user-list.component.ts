import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { USER_ACTIONS } from '../../../store/user/user.actions';
@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent  implements OnInit {
  userList:any=[];
  tableRows: number = 10;
  totalRecords: any;
  constructor(private store: Store<any>,private router: Router){}

  ngOnInit() {
   // this.store.dispatch({ type: USER_ACTIONS.GET_LIST });
    this.store.select('user').subscribe((res:any) => {
        if (res.userList && res.userList.length > 0) {
           this.userList = res.userList;
           this.totalRecords = res.pagination.totalCount;
        }
     });
  }
  onManageRoleClick(user){
    this.router.navigate(['/admin/user-role', user.id]);
  }
  loadLazy(event: any) {
    let pageOptions: any = {};
    pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
    pageOptions.pageSize = event.rows;
    this.tableRows=event.rows;
    this.store.dispatch({ type: USER_ACTIONS.GET_LIST, payload: pageOptions });
  }
}
