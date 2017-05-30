import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AREA_ACTIONS } from '../store/area.actions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../app/core/services/index';
import { AreaService } from '../services/area.service';

@Component({
  moduleId: module.id,
  selector: 'app-area',
  templateUrl: 'area.component.html',
})
export class AreaComponent implements OnInit {
  areaList:any = [];
  areaForm: FormGroup;
  tableRows: number = 10;
  totalRecords: any;
  constructor(
    private store: Store<any>,
    private messageService:MessageService,
    private areaService:AreaService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {  
    this.resetForm();
    this.getAreaList({pageNumber:1,pageSize:10});
    this.store.select('area').subscribe((res:any) => {
       if (res.areaList && res.areaList.length > 0) {
           this.areaList = res.areaList;
           this.totalRecords = res.pagination.totalCount;
        }
    });
  }
  getAreaList(pageOptions){
    this.store.dispatch({ type: AREA_ACTIONS.GET_LIST_PAGINATION , payload:pageOptions });
  }
  resetForm(){
        this.areaForm = this.formBuilder.group({
            areaID:[0],
            areaName: ['', [Validators.required]],
            areaCode: ['', [Validators.required]],
            pinCode: ['', [Validators.required]]
        });
  }
  onEdit(area){
     this.areaForm = this.formBuilder.group({
            areaID: area.areaID,
            areaName: area.areaName,
            areaCode: area.areaCode,
            pinCode: area.pinCode
      });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
     if(value.areaID!==0 && value.areaID!=null){
         this.areaService.saveArea(value.areaID,value).subscribe(
                results=> {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Area Updated' });
                    this.getAreaList({pageNumber:1,pageSize:10});
                    this.resetForm()
                });
      } else {
           this.areaService.addArea(value).subscribe(
                results=> {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Area Saved' });
                    this.getAreaList({pageNumber:1,pageSize:10});
                    this.resetForm()
                });
     }
  }
  onDelete(area:any) {
        this.areaService.deleteArea(area.areaID).subscribe(
            results => {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Area Deleted' });
                    this.resetForm();
                    this.getAreaList({pageNumber:1,pageSize:10});
              });
  }
  loadLazy(event: any) {
    let pageOptions: any = {};
    pageOptions.pageNumber = event.first == 0 ? 1 : Math.ceil(parseFloat((event.first / event.rows).toString())) + 1
    pageOptions.pageSize = event.rows;
    this.tableRows=event.rows;
    this.getAreaList(pageOptions)
  }
}
