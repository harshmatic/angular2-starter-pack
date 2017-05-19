/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { EmployeeService } from '../../services/employee.service';
import { EMPLOYEE_ACTIONS } from '../../store/employee.actions';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-employee-list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})

export class EmployeeListComponent implements OnInit {
    employeeList:any;
    appModuleList:any=[]
    employeeForm: FormGroup;
    selectedEmployee:any;
    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private router: Router) {
    }
    ngOnInit() {
        this.getEmployee();
        this.store.select('employee').subscribe((res:any) => {
           this.employeeList = res;
        });
    }

    getEmployee() {
        this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST });
    }

    onDelete(id: any) {
        this.employeeService.deleteEmployee(id)
            .subscribe((results:any) => {
                this.selectedEmployee=null
                this.getEmployee();
                //this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Record Deleted' });
            });
    }
    onClickAdd() {
         this.router.navigate(['/employee/save']);
    }
    onEdit(id:any){
    this.router.navigate(['/employee/save', id]);
    }

    // filterPermission(event: any) {
    //     let query = event.query;
    //     this.filteredPermissionList = [];
    //     for (let i = 0; i < this.permissionList.length; i++) {
    //         let permission = this.permissionList[i];
    //         if (permission.text.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
    //             this.filteredPermissionList.push(permission);
    //         }
    //     }
    // }





}

