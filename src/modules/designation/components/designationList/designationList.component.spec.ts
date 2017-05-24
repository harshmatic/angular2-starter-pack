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
import {DesignationListComponent} from './designationList.component';
import { DesignationEffects } from '../../store/designation.effects';
import { DesignationService } from '../../services/designation.service';
import { DesignationReducer } from '../../store/designation.reducer';
import { MessageService } from '../../../../app/core/services/index';
import { HttpModule } from '@angular/http';

@Component({selector: 'test-cmp', template: '<admin-designation-list></admin-designation-list>'})
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

class DesignationServiceStub {

    getDesignations() {
        return new Observable<any>((observer:any) => {
           observer.next(testDesignationList);
      });
    }
    addDesignation(department: any) {
      return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
    saveDesignation(id: any, department: any) {
     return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
    deleteDesignation(id: any) {
        return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
}

describe('Component: DesignationList Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(DesignationEffects),
                StoreModule.provideStore({designation: DesignationReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule,HttpModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                DesignationListComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: DesignationService,
                    useClass: DesignationServiceStub
                },
                {
                    provide: MessageService,
                    useClass: MessageServiceStub
                }
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
                let fixture = TestBed.createComponent(DesignationListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.designationList.length).toBe(3);
            });
    }));
    it('check onEdit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DesignationListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onEdit(testDesignationList[0])
                expect(componentInstance.designationForm.value.designationName).toBe(testDesignationList[0].designationName);
            });
    }));
    it('check resetForm method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DesignationListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.resetForm()
                expect(componentInstance.designationForm.value.designationName).toBe('');
            });
    }));
    it('check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DesignationListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value=testDesignationList[0]
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.designationForm.value.designationName).toBe('');
            });
    }));
     it('check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DesignationListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value={designationID:"",designationName:'test',designationCode:'test desc'}
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.designationForm.value.designationName).toBe('');
            });
    }));
});

var testDesignationList=[{"designationID":"57bf3249-6ee2-4506-97a6-cb0d9ce14898",
"designationName":"Admintesttesttest","designationCode":"Admin testtesttest",
"createdOn":"2017-05-24T04:33:12.6430624","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999",
"updatedOn":"2017-05-24T15:08:08.6842069",
"updatedBy":"56c385ae-ce46-41d4-b7fe-08df9aef8888","isDelete":false,
"createdByName":null,"updatedByName":null},
{"designationID":"15251460-e145-4aef-a3da-6846e881ad11",
"designationName":"Assistant Inspector-General","designationCode":"AIG",
"createdOn":"2017-05-24T04:33:12.6430624","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999",
"updatedOn":null,"updatedBy":"00000000-0000-0000-0000-000000000000","isDelete":false,
"createdByName":null,"updatedByName":null}
,{"designationID":"836bf2d2-7eb2-454a-a298-72a9d6aea480",
"designationName":"Assistant Superintendent","designationCode":"ASP",
"createdOn":"2017-05-24T04:33:12.6430624","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999",
"updatedOn":null,"updatedBy":"00000000-0000-0000-0000-000000000000","isDelete":false,
"createdByName":null,"updatedByName":null}]