import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APPMODULE_ACTIONS } from '../../store/appModule/appModule.actions';
import { AppModuleService } from '../../services/appModule.service';
import { MessageService } from '../../../../app/core/services/index';

@Component({
  moduleId: module.id,
  selector: 'app-module-list',
  templateUrl: 'appModule.component.html',
  styleUrls: ['appModule.component.css']
})
export class AppModuleComponent  implements OnInit {
  appModuleList:any=[]
  appModuleForm: FormGroup;
  constructor(private store: Store<any>,private router: Router,
  private  appModuleService:AppModuleService,
  private messageService: MessageService,
   private formBuilder: FormBuilder){}

  ngOnInit() {
    this.resetForm();
    this.store.dispatch({ type: APPMODULE_ACTIONS.GET_LIST });
    this.store.select('appModule').subscribe((res:any) => {
       this.appModuleList = res.appModuleList;
     });
  }
  getModuleList(){
      this.store.dispatch({ type: APPMODULE_ACTIONS.GET_LIST });
  }
  resetForm(){
        this.appModuleForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            menuText: ['', [Validators.required]],
            shortName: ['', [Validators.required]]
        });
  }
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
        this.appModuleService.addModules(value).subscribe(
            results => {
                    this.resetForm();
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'AppModule Saved' });
                    this.getModuleList();
              });
  }
  onDelete(appModule:any) {
        this.appModuleService.deleteModules(appModule.id).subscribe(
            results => {
                    this.messageService.addMessage({ severity: 'success', summary: 'Success', detail: 'AppModule Deleted' });
                    this.resetForm();
                    this.getModuleList();
              });
  }
}
