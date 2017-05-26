import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { USER_ACTIONS } from '../../../store/user/user.actions';
import { ROLE_ACTIONS } from '../../../store/role/role.actions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {  UserService } from '../../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../../../app/core/services/index';

@Component({
  moduleId: module.id,
  selector: 'user-role',
  templateUrl: 'user-role.component.html',
  styleUrls: ['user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  user:any;
  params:any
  userRoles:any=[]
  roleList:any=[]
  roleDropdown:any=[]
  selectedRole: any=null;
  userForm: FormGroup;
  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService){}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
            id:[0],
            userName: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
    });
    this.route.params.forEach((params: Params) => {
            this.params =params['userId'];
            if(this.params){
               this.getAllRoles();
               this.getUser();
            }
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
      this.userForm = this.formBuilder.group({
            id:this.user.id,
            userName: this.user.userName,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
     });
    });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
      this.userService.addUser(value)
                .subscribe(
                results => {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'User Created' });
                    this.router.navigate(['/admin/users']);
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
             this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Role Revoked' });
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
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Role Assigned' });
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
