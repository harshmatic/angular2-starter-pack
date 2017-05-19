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
    if(value.departmentID!==0 && value.departmentID!=null){
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
  onDelete(dept:any) {
        this.departmentService.deleteDepartment(dept.departmentID).subscribe(
            results => {
                    this.resetForm();
                    this.getList()
              });
  }
}



