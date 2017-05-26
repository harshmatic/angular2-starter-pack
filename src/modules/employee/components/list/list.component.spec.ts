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
import { EmployeeListComponent } from './list.component';
import { EmployeeEffects } from '../../store/employee.effects';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeReducer } from '../../store/employee.reducer';
import { MessageService } from '../../../../app/core/services/index';
import { HttpModule } from '@angular/http';

@Component({selector: 'test-cmp', template: '<admin-employee-list></admin-employee-list>'})
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

class EmployeeServiceStub {

    getEmployees() {
        return new Observable<any>((observer:any) => {
           observer.next(testEmployeeList);
      });
    }
    getEmployeePagination(payload) {
         return new Observable<any>((observer:any) => {
           observer.next(testEmployeeList);
         });
    }
    deleteEmployee(id: any) {
        return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
}

describe('Component: EmployeeListComponent Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(EmployeeEffects),
                StoreModule.provideStore({employee: EmployeeReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule,HttpModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                EmployeeListComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: EmployeeService,
                    useClass: EmployeeServiceStub
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
                let fixture = TestBed.createComponent(EmployeeListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.employeeList.length).toBe(0);
            });
    }));
    it('check lazy load', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(EmployeeListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.loadLazy({first:1,rows:10})
                expect(componentInstance.tableRows).toBe(10);
            });
    }));
});

var testEmployeeList=[{"employeeID":"56c385ae-ce46-41d4-b7fe-08df9aef3333","firstName":"Angelina","lastName":"Jolie","employeeCode":"Emp003","dateofBirth":"1987-05-24T10:33:12.7410636","gender":"Female","mobile":"95135782460","email":"angelina.jolie@kenyapolice.com","residencePhone1":null,"organizationJoiningDate":"2012-05-24T10:33:12.7410636","serviceJoiningDate":"2012-05-24T10:33:12.7410636","address1":"Salama House, Wabera Street Nairobi.","address2":null,"areaID":"89234f93-6a6a-4960-a7d3-20f98f2760a8","departmentID":"a1da1d8e-1111-4634-b538-a01709473333","designationID":"aff1592e-ba8e-4791-831c-5df49da69054","shiftID":"95998825-255a-401f-aab1-5ef4c2a56285","userID":"56c385ae-ce46-41d4-b7fe-08df9aef7201","mstArea":{"areaID":"89234f93-6a6a-4960-a7d3-20f98f2760a8","areaName":"Laisamis","areaCode":"LSMS","pinCode":"6 0502","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6330624","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"mstDepartment":{"departmentID":"a1da1d8e-1111-4634-b538-a01709473333","departmentName":"Criminal Investigation Department","departmentCode":"CID","departmentDespcription":"Responsible for investigating complex cases.","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.4490608","isAssigned":false,"isDelete":true,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"mstDesignation":{"designationID":"aff1592e-ba8e-4791-831c-5df49da69054","designationName":"Senior Assistant Inspector-General","designationCode":"SAIG","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6430624","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"mstShift":{"shiftID":"95998825-255a-401f-aab1-5ef4c2a56285","shiftName":"Officers Morning Shift","mondayStartTime":"04:00:00","mondayEndTime":"12:00:00","tuesdayStartTime":"04:00:00","tuesdayEndTime":"12:00:00","wednesdayStartTime":"04:00:00","wednesdayEndTime":"12:00:00","thursdayStartTime":"04:00:00","thursdayEndTime":"12:00:00","fridayStartTime":"04:00:00","fridayEndTime":"12:00:00","saturdayStartTime":"04:00:00","saturdayEndTime":"12:00:00","sundayStartTime":"00:00:00","sundayEndTime":"00:00:00","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6980633","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"mstOccurrenceBooks":[{"obid":"411bfab2-0d44-4fb9-8835-184db90f5678","mstArea":{"areaID":"89234f93-6a6a-4960-a7d3-20f98f2760a8","areaName":"Laisamis","areaCode":"LSMS","pinCode":"6 0502","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6330624","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"areaID":"89234f93-6a6a-4960-a7d3-20f98f2760a8","mstOccurrenceType":{"obTypeID":"758b1995-7f92-4d87-9588-b90800abf222","obTypeName":"Theft and banditry","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6890628","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"obTypeID":"758b1995-7f92-4d87-9588-b90800abf222","mstDepartment":{"departmentID":"a1da1d8e-1111-4634-b538-a01709473333","departmentName":"Criminal Investigation Department","departmentCode":"CID","departmentDespcription":"Responsible for investigating complex cases.","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.4490608","isAssigned":false,"isDelete":true,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"departmentID":"a1da1d8e-1111-4634-b538-a01709473333","mstStatus":{"statusID":"853bdecf-1ed1-46c4-b200-e8be243fddad","statusName":"Open","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.7310636","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"statusID":"853bdecf-1ed1-46c4-b200-e8be243fddad","obNumber":"456789","obTime":"2017-04-10T19:25:14.9100866","caseFileNumber":"2","natureOfOccurrence":"Nature 2","remark":"Test Remark 2","mstEmployee":{"employeeID":"56c385ae-ce46-41d4-b7fe-08df9aef3333","firstName":"Angelina","lastName":"Jolie","employeeCode":"Emp003","dateOfBirth":"1987-05-24T10:33:12.7410636","gender":"Female","mobile":"95135782460","email":"angelina.jolie@kenyapolice.com","residencePhone":"020-22565784","organizationJoiningDate":"2012-05-24T10:33:12.7410636","serviceJoiningDate":"2012-05-24T10:33:12.7410636","address1":"Salama House, Wabera Street Nairobi.","address2":null,"mstArea":{"areaID":"89234f93-6a6a-4960-a7d3-20f98f2760a8","areaName":"Laisamis","areaCode":"LSMS","pinCode":"6 0502","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6330624","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"areaID":"89234f93-6a6a-4960-a7d3-20f98f2760a8","mstDepartment":{"departmentID":"a1da1d8e-1111-4634-b538-a01709473333","departmentName":"Criminal Investigation Department","departmentCode":"CID","departmentDespcription":"Responsible for investigating complex cases.","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.4490608","isAssigned":false,"isDelete":true,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"departmentID":"a1da1d8e-1111-4634-b538-a01709473333","mstDesignation":{"designationID":"aff1592e-ba8e-4791-831c-5df49da69054","designationName":"Senior Assistant Inspector-General","designationCode":"SAIG","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6430624","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"designationID":"aff1592e-ba8e-4791-831c-5df49da69054","mstShift":{"shiftID":"95998825-255a-401f-aab1-5ef4c2a56285","shiftName":"Officers Morning Shift","mondayStartTime":"04:00:00","mondayEndTime":"12:00:00","tuesdayStartTime":"04:00:00","tuesdayEndTime":"12:00:00","wednesdayStartTime":"04:00:00","wednesdayEndTime":"12:00:00","thursdayStartTime":"04:00:00","thursdayEndTime":"12:00:00","fridayStartTime":"04:00:00","fridayEndTime":"12:00:00","saturdayStartTime":"04:00:00","saturdayEndTime":"12:00:00","sundayStartTime":"00:00:00","sundayEndTime":"00:00:00","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef9999","createdOn":"2017-05-24T04:33:12.6980633","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"shiftID":"95998825-255a-401f-aab1-5ef4c2a56285","appUser":{"firstName":"Angelina","lastName":"Jolie","lastLogin":"0001-01-01T00:00:00","failedPasswordAttemptCount":0,"id":"56c385ae-ce46-41d4-b7fe-08df9aef7201","userName":"angelinajolie","normalizedUserName":"ANGELINAJOLIE","email":"angelina.jolie@kenyapolice.com","normalizedEmail":"ANGELINA.JOLIE@KENYAPOLICE.COM","emailConfirmed":false,"passwordHash":"AQAAAAEAACcQAAAAEHFRpoIgZqxmrakRc862QWxP9lvLB7l9dtO05xs4nj4g3FHY6wktGVYEenByQpVZ3w==","securityStamp":"d96980fc-5df0-40bd-8862-e7515947cfe7","concurrencyStamp":"e78566f2-863f-4200-8e5f-ce1dff3bd04d","phoneNumber":null,"phoneNumberConfirmed":false,"twoFactorEnabled":false,"lockoutEnd":null,"lockoutEnabled":true,"accessFailedCount":0,"roles":[],"claims":[],"logins":[]},"userID":"56c385ae-ce46-41d4-b7fe-08df9aef7201","mstOccurrenceBooks":[],"createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef1111","createdOn":"2017-05-24T04:33:12.7410636","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null},"assignedTO":"56c385ae-ce46-41d4-b7fe-08df9aef3333","assignedComments":"Assigned to SAIG in CID","assignedTime":"2017-05-24T05:33:12.951065","priority":3,"createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef6666","createdOn":"2017-05-24T05:33:12.951065","isAssigned":false,"isDelete":false,"updatedBy":null,"updatedOn":null,"createdByName":null,"updatedByName":null}],"appUser":{"firstName":"Angelina","lastName":"Jolie","lastLogin":"0001-01-01T00:00:00","failedPasswordAttemptCount":0,"id":"56c385ae-ce46-41d4-b7fe-08df9aef7201","userName":"angelinajolie","normalizedUserName":"ANGELINAJOLIE","email":"angelina.jolie@kenyapolice.com","normalizedEmail":"ANGELINA.JOLIE@KENYAPOLICE.COM","emailConfirmed":false,"passwordHash":"AQAAAAEAACcQAAAAEHFRpoIgZqxmrakRc862QWxP9lvLB7l9dtO05xs4nj4g3FHY6wktGVYEenByQpVZ3w==","securityStamp":"d96980fc-5df0-40bd-8862-e7515947cfe7","concurrencyStamp":"e78566f2-863f-4200-8e5f-ce1dff3bd04d","phoneNumber":null,"phoneNumberConfirmed":false,"twoFactorEnabled":false,"lockoutEnd":null,"lockoutEnabled":true,"accessFailedCount":0,"roles":[],"claims":[],"logins":[]},"createdOn":"2017-05-24T04:33:12.7410636","createdBy":"56c385ae-ce46-41d4-b7fe-08df9aef1111","updatedOn":null,"updatedBy":"00000000-0000-0000-0000-000000000000","isDelete":false,"createdByName":null,"updatedByName":null}]