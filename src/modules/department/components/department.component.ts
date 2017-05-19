import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Department } from '../store/department.model';
import { DEPARTMENT_ACTIONS } from '../store/department.actions';
import { Patch } from '../../patchReq.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DepartmentService } from '../services/department.service';

@Component({
  moduleId: module.id,
  selector: 'app-department',
  templateUrl: 'department.component.html',
  styleUrls:['department.component.css']
})
export class DepartmentComponent  implements OnInit {
  departmentList:any=[]
  departmentForm: FormGroup;
  constructor(private store: Store<any>, 
   private formBuilder: FormBuilder,
   private departmentService:DepartmentService ){}

  ngOnInit() {
    this.getList()
    this.resetForm()
    // //Create
    // this.store.dispatch({ type: DEPARTMENT_ACTIONS.ADD,payload:this.departmentObj });
    // //Delete
    // this.store.dispatch({ type: DEPARTMENT_ACTIONS.DELETE,payload:"a7c15c4c-e83c-4d8c-a010-53a41d2a88e9" });
    // //Update (PUT)
     //this.store.dispatch({ type: DEPARTMENT_ACTIONS.UPDATE,payload:{id:"a1da1d8e-1111-4634-b538-a01709471111",updates:this.departmentObj}});
    // //Update (PATCH)
    // this.store.dispatch({ type: OB_ACTIONS.UPDATE,payload:{id:"88f50d32-bb51-4835-90e9-1b02c8109ab2",updates:this.patchReq}});
    this.store.select('department').subscribe((res:any) => {
       this.departmentList = res;
     });
  }
  getList(){
     this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
  }
  onEdit(department){
     this.departmentForm = this.formBuilder.group({
            departmentID:department.departmentID,
            departmentName: department.departmentName,
            departmentDespcription: department.departmentDespcription,
      });
  }
  resetForm(){
      this.departmentForm = this.formBuilder.group({
            departmentID:[0],
            departmentName: ['', [Validators.required]],
            departmentDespcription: ['', [Validators.required]]
      });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if(value.id!==0 && value.id!=null){
      this.departmentService.saveDepartment(value.id,value).subscribe(
                results=> {
                    this.getList()
                    this.resetForm()
                });
      } else {
           this.departmentService.addDepartment(value).subscribe(
                results=> {
                    this.getList()
                    this.resetForm()
                });
    }
  }
  onDelete(appModule:any) {
        // this.appModuleService.deleteModules(appModule.id).subscribe(
        //     results => {
        //             this.resetForm();
        //             this.getModuleList();
        //       });
  }
}



