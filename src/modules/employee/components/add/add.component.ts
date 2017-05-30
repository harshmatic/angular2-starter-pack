/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { EmployeeService } from '../../services/employee.service';
import { EMPLOYEE_ACTIONS } from '../../store/employee.actions';
import { DesignationService } from '../../../designation/services/designation.service';
import { DESIGNATION_ACTIONS } from '../../../designation/store/designation.actions';
import { DepartmentService } from '../../../department/services/department.service';
import { DEPARTMENT_ACTIONS } from '../../../department/store/department.actions';
import { AreaService } from '../../../area/services/area.service';
import { AREA_ACTIONS } from '../../../area/store/area.actions';
import { ShiftService } from '../../../shift/services/shift.service';
import { SHIFT_ACTIONS } from '../../../shift/store/shift.actions';
import { UserService } from '../../../admin/services/user.service';
import { USER_ACTIONS } from '../../../admin/store/user/user.actions';
import { Subscription } from 'rxjs/Subscription';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-saveEmployee-list',
    templateUrl: 'add.component.html',
    styleUrls: ['add.component.css']
})

export class EmployeeSaveComponent implements OnInit {
    areaList: any[];
    designationList: any[];
    departmentList: any[];
    shiftList: any[];
    emp: any;
    empId: any = "";
    userList: any[];
    appModuleList: any = []
    employeeForm: FormGroup;
    selectedEmployee: any;
    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private employeeService: EmployeeService,
        private areaService: AreaService,
        private designationService: DesignationService,
        private departmentService: DepartmentService,
        private shiftService: ShiftService,
        private UserService: UserService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }
    ngOnInit() {
        this.getArea();
        this.getDepatment();
        this.getDesignation();
        this.getShift();
        this.getUser();
        this.resetForm();
        if (this.empId !== 'undefined') {
            this.route
                .params
                .subscribe(params => {

                    if (params['employeeID']) {
                        this.empId = params['employeeID'];
                        this.getEmployeeByID(this.empId);
                    }


                });

        }

        this.store.select('area').subscribe((res: any) => {
            this.areaList = res.areaList;
        });
        this.store.select('shift').subscribe((res: any) => {
            this.shiftList = res;
        });
        this.store.select('designation').subscribe((res: any) => {
            this.designationList = res.designationList;
        });
        this.store.select('department').subscribe((res: any) => {
            this.departmentList = res.departmentList;
        });
        this.store.select('user').subscribe((res: any) => {
            this.userList = res.userList;
        });
        if (this.empId !== "") {
            this.store.select('employee').subscribe((res: any) => {
                this.emp = res;
                this.setEmployee(this.emp);
            });
        }




    }

     resetForm() {
        this.employeeForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            employeeCode: ['', [Validators.required]],
            dateofBirth: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            mobile: ['', [Validators.required]],
            email: ['', [Validators.required]],
            organizationJoiningDate: ['', [Validators.required]],
            serviceJoiningDate: ['', [Validators.required]],
            address1: ['', [Validators.required]],
            departmentID: ['', [Validators.required]],
            areaID: ['', [Validators.required]],
            designationID: ['', [Validators.required]],
            shiftID: ['', [Validators.required]],
            userID: '',
            residencePhone1: '',
            address2: ''
        });
    }

    setEmployee(emp: any) {
        this.employeeForm.controls['shiftID'].setValue(emp.shiftID);
        this.employeeForm.controls['firstName'].setValue(emp.firstName);
        this.employeeForm.controls['lastName'].setValue(emp.lastName);
        this.employeeForm.controls['gender'].setValue(emp.gender);
        this.employeeForm.controls['mobile'].setValue(emp.mobile);
        this.employeeForm.controls['address1'].setValue(emp.address1);
        this.employeeForm.controls['address2'].setValue(emp.address2);
        this.employeeForm.controls['residencePhone1'].setValue(emp.residencePhone1);
        this.employeeForm.controls['email'].setValue(emp.email);
        this.employeeForm.controls['employeeCode'].setValue(emp.employeeCode);
        this.employeeForm.controls['areaID'].setValue(emp.areaID);
        this.employeeForm.controls['designationID'].setValue(emp.designationID);
        this.employeeForm.controls['departmentID'].setValue(emp.departmentID);
        this.employeeForm.controls['userID'].setValue(emp.userID);
        this.employeeForm.controls['organizationJoiningDate'].setValue(new Date(emp.organizationJoiningDate));
        this.employeeForm.controls['serviceJoiningDate'].setValue(new Date(emp.serviceJoiningDate));
        this.employeeForm.controls['dateofBirth'].setValue(new Date(emp.dateofBirth));
    }
   


    getEmployeeByID(id: any) {
        this.store.dispatch({ type: EMPLOYEE_ACTIONS.GET_LIST_BY_ID, payload: { id: id } });
    }

    getArea() {
        this.store.dispatch({ type: AREA_ACTIONS.GET_LIST });
    }

    getDesignation() {
        this.store.dispatch({ type: DESIGNATION_ACTIONS.GET_LIST });
    }

    getDepatment() {
        this.store.dispatch({ type: DEPARTMENT_ACTIONS.GET_LIST });
    }

    getShift() {
        this.store.dispatch({ type: SHIFT_ACTIONS.GET_LIST });
    }

    getUser() {
        this.store.dispatch({ type: USER_ACTIONS.GET_LIST_USER });
    }


    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        
        if (this.empId == "" || !this.empId) {
            this.employeeService.addEmployee(value)
                .subscribe(
                results => {
                    this.resetForm();
                });
        } else {
            this.employeeService.saveEmployee(this.empId, value)
                .subscribe(
                results => {
                    this.resetForm();
                });
        }

    }

}

