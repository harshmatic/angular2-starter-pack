/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { RoleService } from '../../../services/role.service';
import { ROLE_ACTIONS } from '../../../store/role/role.actions';
import { APPMODULE_ACTIONS } from '../../../store/appModule/appModule.actions';
import { MessageService } from '../../../../../app/core/services/index';
/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-role-list',
    templateUrl: 'role-list.component.html',
    styleUrls: ['role-list.component.css']
})

export class RoleListComponent implements OnInit {
    roleList:any;
    appModuleList:any=[]
    roleForm: FormGroup;
    selectedRole:any;
    permissionList:any
    filteredPermissionList:any
    selectedPermission:any;
    rolePermissions:any=[]
    rolePermissionsList:any=[]
    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private roleService: RoleService,
        private messageService: MessageService,
        private router: Router) {
    }
    ngOnInit() {
        this.getRole();
        this.resetForm()
        this.store.select('role').subscribe((res:any) => {
           this.roleList = res.roleList;
        });
        this.store.dispatch({ type: APPMODULE_ACTIONS.GET_LIST });
        this.store.select('appModule').subscribe((res:any) => {
                this.appModuleList = res.appModuleList;
                this.createPermissions()
                this.rolePermissions = res.rolePermissions;
        });
       
    }
    resetForm(){
        this.roleForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
    }
    getRolePermission() {
        this.store.dispatch({ type: ROLE_ACTIONS.GET_ROLE_PERMISSION_LIST,payload:{roleId:this.selectedRole.id} });
        this.store.select('role').subscribe((res:any) => {
            this.rolePermissions = res.rolePermissions;
            this.setRolePermission()
        });
    }
    setRolePermission(){
       this.rolePermissionsList=[]
          for (let i = 0; i < this.rolePermissions.length; i++) {
              let permission=(this.rolePermissions[i]).split('.')
              if(permission.length===2){
                 let obj = this.permissionList.find((item)=>{
                    return this.rolePermissions[i]===item.shortName
                 })
                 if(obj){
                     this.rolePermissionsList.push(obj)
                 }
              }
          }
    }
    getRole() {
        this.store.dispatch({ type: ROLE_ACTIONS.GET_LIST });
    }
    managePermission(role: any){
        this.selectedRole = role;
        this.getRolePermission()
    }
    // onDelete(role: any) {
    //     this.roleService.deleteRole(role.id)
    //         .subscribe((results:any) => {
    //             this.selectedRole=null
    //             this.getRole();
    //         });
    // }
    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        this.roleService.addRole(value)
                .subscribe(
                results => {
                    this.resetForm();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Role Created' });
                    this.getRole();
                });
    }
    filterPermission(event: any) {
        let query = event.query;
        this.filteredPermissionList = [];
        for (let i = 0; i < this.permissionList.length; i++) {
            let permission = this.permissionList[i];
            if (permission.text.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                this.filteredPermissionList.push(permission);
            }
        }
    }
    onAddPermission() {
        this.roleService.addPermissionToRole(this.selectedRole.id,this.selectedPermission)
            .subscribe(
            results => {
                this.selectedPermission=null;
                this.getRolePermission();
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Permission Added' });
            });
    }
    onRevokePermission(item) {
        this.roleService.deleteRolePermission(this.selectedRole.id,item)
            .subscribe(
            results => {
                this.selectedPermission=null;
                this.getRolePermission();
                this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Permission Revoked' });
            });
    }
    private createPermissions(){
        this.permissionList=[]
        let operation=[{name:'Create',id:'C'},{name:'Read',id:'R'},{name:'Update',id:'U'},{name:'Delete',id:'D'}]
        for (let i=0;i<this.appModuleList.length;i++){
            for(let j=0;j<operation.length;j++){
                let obj={
                    AppModuleName:this.appModuleList[i].shortName,
                    PermissionType:operation[j].id,
                    text:this.appModuleList[i].name+' '+operation[j].name,
                    shortName:this.appModuleList[i].shortName+'.'+operation[j].id
                }
                this.permissionList.push(obj)
            }
        }
    }
}

