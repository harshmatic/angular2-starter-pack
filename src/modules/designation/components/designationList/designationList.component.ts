/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/** Other Module Dependencies */
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { DesignationService } from '../../services/designation.service';
import { DESIGNATION_ACTIONS } from '../../store/designation.actions';

/** Component Declaration */
@Component({
    moduleId: module.id,
    selector: 'admin-designation-list',
    templateUrl: 'designationList.component.html',
    styleUrls: ['designationList.component.css']
})

export class DesignationListComponent implements OnInit {
    designationList:any=[];
    designationForm: FormGroup;
    selectedDesignation:any;
    tableRows: number = 10;
    totalRecords: any;
    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private designationService: DesignationService,
        private router: Router) {
    }
    ngOnInit() {
        this.getDesignation({pageNumber:1,pageSize:10});
        this.resetForm()
        this.store.select('designation').subscribe((res:any) => {
            if (res.designationList && res.designationList.length > 0) {
               this.designationList = res;
               this.totalRecords = res.pagination.totalCount;
            }
        });
    }
    loadLazy(event: any) {
        let pageOptions: any = {};
        pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
        pageOptions.pageSize = event.rows;
        this.tableRows=event.rows;
        this.getDesignation(pageOptions)
    }
    resetForm(){
        this.designationForm = this.formBuilder.group({
            designationName: ['', [Validators.required]],
            designationCode: ['', [Validators.required]],
            designationID: ''
        });
    }


    getDesignation(pageOptions) {
        this.store.dispatch({ type: DESIGNATION_ACTIONS.GET_LIST_PAGINATION, payload:pageOptions  });
    }

    onDelete(designation: any) {
        this.designationService.deleteDesignation(designation.designationID)
            .subscribe((results:any) => {
                this.selectedDesignation=null
                this.getDesignation({pageNumber:1,pageSize:10});
                //this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Record Deleted' });
            });
    }
    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (value.designationID=="") {
            this.designationService.addDesignation(value)
                .subscribe(
                results => {
                    this.resetForm();
                    this.getDesignation({pageNumber:1,pageSize:10});
                });
        } else {
            this.designationService.saveDesignation(value.designationID,value)
                .subscribe(
                results => {
                    this.resetForm();
                    this.getDesignation({pageNumber:1,pageSize:10});
                });
        }
        
    }
    onEdit(designation: any){
        this.selectedDesignation = designation;
          this.designationForm = this.formBuilder.group({
            designationName:this.selectedDesignation.designationName,
            designationCode: this.selectedDesignation.designationCode,
            designationID: this.selectedDesignation.designationID
        });
       // this.getRolePermission()
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

