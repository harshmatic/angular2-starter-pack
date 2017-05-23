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
  userList:any=[]
  constructor(private store: Store<any>,private router: Router){}

  ngOnInit() {
    this.store.dispatch({ type: USER_ACTIONS.GET_LIST });
    this.store.select('user').subscribe((res:any) => {
       this.userList = res.userList;
     });
  }
  onManageRoleClick(user){
    this.router.navigate(['/admin/user-role', user.id]);
  }
}
