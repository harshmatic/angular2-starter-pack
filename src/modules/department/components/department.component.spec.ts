import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../app/shared/shared.module';
import {DepartmentComponent} from './department.component';
import { DepartmentEffects } from '../store/department.effects';
import { DepartmentService } from '../services/department.service';
import { DepartmentReducer } from '../store/department.reducer';;

@Component({selector: 'test-cmp', template: '<user-role></user-role>'})
class TestComponent {}

@Directive({selector: '[routerLink]'})
export class RouterLinkStubDirective {}

class DepartmentServiceStub {
    getDepartments() {
        return new Observable<any>((observer:any) => {
           observer.next(testDepartmentList);
      });
    }
    addDepartment(department: any) {
      return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
    saveDepartment(id: any, department: any) {
     return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
    deleteDepartment(id: any) {
        return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
}

describe('Component: DepartmentComponent Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(DepartmentEffects),
                StoreModule.provideStore({department:DepartmentReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                DepartmentComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: DepartmentService,
                    useClass: DepartmentServiceStub
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
                let fixture = TestBed.createComponent(DepartmentComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.departmentList.length).toBe(2);
            });
    }));
    it('check onEdit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DepartmentComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onEdit(testDepartmentList[0])
                expect(componentInstance.departmentForm.value.departmentName).toBe(testDepartmentList[0].departmentName);
            });
    }));
    it('check resetForm method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DepartmentComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.resetForm()
                expect(componentInstance.departmentForm.value.departmentName).toBe('');
            });
    }));
    it('check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DepartmentComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value=testDepartmentList[0]
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.departmentForm.value.departmentName).toBe('');
            });
    }));
     it('check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(DepartmentComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value={departmentID:0,departmentName:'test',departmentDespcription:'test desc'}
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.departmentForm.value.departmentName).toBe('');
            });
    }));
});

var testDepartmentList=[{
    "departmentID": "a1da1d8e-1111-4634-b538-a01709472222",
    "departmentName": "Anti Stock Theft Unit",
    "departmentDespcription": "Anti Stock Theft Unit for stock ",
    "createdOn": "2017-05-19T10:35:22.1032114",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
    "departmentName": "Criminal Investigation Department",
    "departmentDespcription": "Responsible for investigating complex cases.",
    "createdOn": "2017-05-19T10:35:22.1032114",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  }]