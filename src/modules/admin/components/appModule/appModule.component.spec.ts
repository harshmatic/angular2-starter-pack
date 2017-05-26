import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../../app/shared/shared.module';
import {AppModuleComponent} from './appModule.component';
import { AuthService } from '../../../../app/core/index';
import { AppModuleEffects } from '../../store/appModule/appModule.effects';
import { AppModuleService } from '../../services/appModule.service';
import { AppModuleReducer } from '../../store/appModule/appModule.reducer';
import { MessageService } from '../../../../app/core/services/index';

@Component({selector: 'test-cmp', template: '<app-module-list></app-module-list>'})
class TestComponent {}

@Directive({selector: '[routerLink]'})
export class RouterLinkStubDirective {}
var message=''
class MessageServiceStub {
    addMessage(data : any) {
        message = data.detail
        return;
    }
}
class AppModuleServiceStub {
    getModules() {
      return new Observable<any>((observer:any) => {
           observer.next(testData);
      });
    }
    addModules(payload){
      return new Observable<any>((observer:any) => {
         testData.push(payload)
         observer.next(testData);
       });
    }
    deleteModules(id:string){
      return new Observable<any>((observer:any) => {
          testData.splice(1,testData.length)
          observer.next(testData);
      });
    }
}

describe('Component: AppModule Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(AppModuleEffects),
                StoreModule.provideStore({appModule:AppModuleReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AppModuleComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: MessageService,
                    useClass: MessageServiceStub
                },
                 {
                    provide: AppModuleService,
                    useClass: AppModuleServiceStub
                },
            ]
        });
    });
    it('should have a defined component', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(TestComponent);
                fixture.detectChanges();
                expect(fixture.nativeElement).toBeTruthy();
                expect(TestComponent).toBeDefined();
            });
    }));
    it('check component init', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AppModuleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                 expect(componentInstance.appModuleList.length).toBe(2);
            });
    }));
    it('check getModuleList methods', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AppModuleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.getModuleList()
                 expect(componentInstance.appModuleList.length).toBe(2);
            });
    }));
    it('check resetForm methods', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AppModuleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.resetForm()
                 expect(componentInstance.appModuleForm.value.name).toBe('');
            });
    }));
    it('check onSubmit methods', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AppModuleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value={id:12,name:'test',menuText:'test'}
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.appModuleList.length).toBe(3);
            });
    }));
     it('check onDelete methods', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AppModuleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onDelete(12)
                expect(componentInstance.appModuleList.length).toBe(1);
            });
    }));
});

var testData=[
  {
    "id": "1325360c-8253-473a-a23f-55c269c34567",
    "menuText": "Area",
    "name": "Area",
    "shortName": "AR",
    "createdOn": "2017-05-19T05:40:58.1663531",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "id": "1325360c-8253-473a-a23f-55c269c92345",
    "menuText": "Dashboard",
    "name": "Dashboard",
    "shortName": "DB",
    "createdOn": "2017-05-19T05:40:58.1663531",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  }]