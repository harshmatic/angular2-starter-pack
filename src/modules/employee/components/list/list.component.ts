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
    employeeList:any=[];
    appModuleList:any=[]
    employeeForm: FormGroup;
    selectedEmployee:any;
    tableRows: number = 10;
    totalRecords: any;
    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private router: Router) {
    }
    ngOnInit() {
        this.getEmployees({pageNumber:1,pageSize:10});
        this.store.select('employee').subscribe((res:any) => {
            if (res.employeeList && res.employeeList.length > 0) {
                this.employeeList = res.employeeList;
                this.totalRecords = res.pagination.totalCount;
            }
        });
    }
    loadLazy(event: any) {
        let pageOptions: any = {};
        pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
        pageOptions.pageSize = event.rows;
        this.tableRows=event.rows;
        this.getEmployees(pageOptions)
    }
    getEmployees(pageOptions) {
        this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST_PAGINATION, payload:pageOptions  });
    }

    onDelete(id: any) {
        this.employeeService.deleteEmployee(id)
            .subscribe((results:any) => {
                this.selectedEmployee=null
                this.getEmployees({pageNumber:1,pageSize:10});
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

