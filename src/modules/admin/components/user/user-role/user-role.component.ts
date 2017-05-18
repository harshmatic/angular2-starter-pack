import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { USER_ACTIONS } from '../../../store/user/user.actions';
import { ROLE_ACTIONS } from '../../../store/role/role.actions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {  UserService } from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'user-role',
  templateUrl: 'user-role.component.html',
})
export class UserRoleComponent implements OnInit {
  user:any;
  params:any
  userRoles:any=[]
  roleList:any=[]
  roleDropdown:any=[]
  selectedRole: any=null;
  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
     private userService: UserService){}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
            this.params =params['userId'];
            this.getAllRoles();
            this.getUser();
      });
  }
  getAllRoles(){
    this.store.dispatch({ type: ROLE_ACTIONS.GET_LIST });
    this.store.select('role').subscribe((res:any) => {
       this.roleList = res.roleList;
        this.getUserRole();
     });
  }
  getUser(){
    this.store.dispatch({ type: USER_ACTIONS.GET,payload:{id:this.params} });
    this.store.select('user').subscribe((res:any) => {
       this.user = res.user;
     });
  }
  getUserRole() {
    this.store.dispatch({ type: USER_ACTIONS.GET_USER_ROLE,payload:{id:this.params} });
    this.store.select('user').subscribe((res:any) => {
       this.userRoles = res.userRole;
       this.setRoleDropdown();
    }); 
  }
  onRevokeRole(role:any) {
    let selectedRoleID=''
    for(let i=0;i<this.roleList.length;i++){
      if(this.roleList[i].name==role){
        selectedRoleID=this.roleList[i].id
        break;
      }
    }
    this.userService.deleteUserRole(this.params,{"RoleId" :selectedRoleID})
      .subscribe(results=> {
             this.getUserRole();
      });
  }
  onAssignRole() {
        if (this.selectedRole !== '' &&  this.selectedRole!==null) {
            this.selectedRole.UserId = this.params;
            this.userService.addUserRole(this.params,{"RoleId" :this.selectedRole.id})
                .subscribe(
                results=> {
                    this.selectedRole = null;
                    this.getUserRole();
                });
        }
    }
  private setRoleDropdown() {
        var flag = false;
        this.roleDropdown = [];
        for (var i = 0; i < this.roleList.length; i++) {
            for (var j = 0; j < this.userRoles.length; j++) {
                if (this.roleList[i].name === this.userRoles[j]) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.roleDropdown.push(this.roleList[i]);
            }
            flag = false;
        }
    }
}
