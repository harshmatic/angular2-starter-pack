import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../../app/shared/shared.module';
import { OfficerListComponent } from './officerList.component';
import { AuthService } from '../../../../app/core/index';
import { EmployeeEffects } from '../../store/employee.effects';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeReducer } from '../../store/employee.reducer';

@Component({selector: 'test-cmp', template: '<app-officerList></app-officerList>'})
class TestComponent {}

@Directive({selector: '[routerLink]'})
export class RouterLinkStubDirective {}
class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}
class AuthServiceStub {
     getCurrentUser() {
       return {areaID:'1234'}
    }
  onAuthStatusChanged$ () {
     return new Observable<any>((observer:any) => {
       observer.next(true);
     });
  }
}
class EmployeeServiceStub {
  getEmployeesByPage(searchQuery?:any,pageNum?:any,pageSize?:any,areaId?:any) {
     return new Observable<any>((observer:any) => {
       observer.next(testData);
     });
  }
}

describe('Component: OB Detail Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(EmployeeEffects),
                StoreModule.provideStore({employee:EmployeeReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule,HttpModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                OfficerListComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
               {
                    provide: AuthService,
                    useClass: AuthServiceStub
                },
                {
                    provide: EmployeeService,
                    useClass: EmployeeServiceStub
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
                let fixture = TestBed.createComponent(OfficerListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.officerPageNum).toBe(2);
                expect(componentInstance.stopScroll).toBe(false);
                expect(componentInstance.officers.length).toBe(1);
            });
    }));
    it('it should check onKeyup method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OfficerListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onKey({target:{value:'test'}});
                expect(componentInstance.queryString).toBe('test');
            });
    }));
    it('it should check getOfficer method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OfficerListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.getOfficer();
                expect(componentInstance.officerPageNum).toBe(3);
                 expect(componentInstance.officers.length).toBe(2);
            });
    }));

    it('it should check applyStatus method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OfficerListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let result=componentInstance.applyStatus('test');
                expect(result).toBe('statusOpen');
                let result2=componentInstance.applyStatus('Assigned');
                expect(result2).toBe("statusAssigned");
            });
    }));
});


var testData=[
  {
    "employeeID": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
    "firstName": "Angelina",
    "lastName": "Jolie",
    "employeeCode": "Emp003",
    "dateofBirth": "1987-05-15T12:49:14.1301741",
    "gender": "Female",
    "mobile": "95135782460",
    "email": "angelina.jolie@kenyapolice.com",
    "residencePhone1": null,
    "organizationJoiningDate": "2012-05-15T12:49:14.1301741",
    "serviceJoiningDate": "2012-05-15T12:49:14.1301741",
    "address1": "Salama House, Wabera Street Nairobi.",
    "address2": null,
    "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
    "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
    "designationID": "aff1592e-ba8e-4791-831c-5df49da69054",
    "shiftID": "95998825-255a-401f-aab1-5ef4c2a56285",
    "userID": "56c385ae-ce46-41d4-b7fe-08df9aef7201",
    "mstArea": {
      "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
      "areaName": "Laisamis",
      "areaCode": "LSMS",
      "pinCode": "6 0502",
      "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
      "createdOn": "2017-05-15T06:49:13.9671647",
      "isDelete": false,
      "updatedBy": null,
      "updatedOn": null,
      "createdByName": null,
      "updatedByName": null
    },
    "mstDepartment": {
      "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
      "departmentName": "Criminal Investigation Department",
      "departmentDespcription": "Responsible for investigating complex cases.",
      "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
      "createdOn": "2017-05-15T06:49:13.4311341",
      "isDelete": false,
      "updatedBy": null,
      "updatedOn": null,
      "createdByName": null,
      "updatedByName": null
    },
    "mstDesignation": {
      "designationID": "aff1592e-ba8e-4791-831c-5df49da69054",
      "designationName": "Senior Assistant Inspector-General",
      "designationCode": "SAIG",
      "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
      "createdOn": "2017-05-15T06:49:14.0471693",
      "isDelete": false,
      "updatedBy": null,
      "updatedOn": null,
      "createdByName": null,
      "updatedByName": null
    },
    "mstShift": {
      "shiftID": "95998825-255a-401f-aab1-5ef4c2a56285",
      "shiftName": "Officers Morning Shift",
      "startTime": "04:00:00",
      "endTime": "12:00:00",
      "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
      "createdOn": "2017-05-15T06:49:14.0901718",
      "isDelete": false,
      "updatedBy": null,
      "updatedOn": null,
      "createdByName": null,
      "updatedByName": null
    },
    "mstOccurrenceBooks": [
      {
        "obid": "411bfab2-0d44-4fb9-8835-184db90f5678",
        "mstArea": {
          "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
          "areaName": "Laisamis",
          "areaCode": "LSMS",
          "pinCode": "6 0502",
          "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
          "createdOn": "2017-05-15T06:49:13.9671647",
          "isDelete": false,
          "updatedBy": null,
          "updatedOn": null,
          "createdByName": null,
          "updatedByName": null
        },
        "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
        "mstOccurrenceType": {
          "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
          "obTypeName": "Theft and banditry",
          "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
          "createdOn": "2017-05-15T06:49:14.0751709",
          "isDelete": false,
          "updatedBy": null,
          "updatedOn": null,
          "createdByName": null,
          "updatedByName": null
        },
        "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
        "mstDepartment": {
          "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
          "departmentName": "Criminal Investigation Department",
          "departmentDespcription": "Responsible for investigating complex cases.",
          "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
          "createdOn": "2017-05-15T06:49:13.4311341",
          "isDelete": false,
          "updatedBy": null,
          "updatedOn": null,
          "createdByName": null,
          "updatedByName": null
        },
        "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
        "mstStatus": {
          "statusID": "853bdecf-1ed1-46c4-b200-e8be243fddad",
          "statusName": "Open",
          "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
          "createdOn": "2017-05-15T06:49:14.1151732",
          "isDelete": false,
          "updatedBy": null,
          "updatedOn": null,
          "createdByName": null,
          "updatedByName": null
        },
        "statusID": "853bdecf-1ed1-46c4-b200-e8be243fddad",
        "obNumber": "456789",
        "obTime": "2017-04-10T19:25:14.9100866",
        "caseFileNumber": "2",
        "natureOfOccurrence": "Nature 2",
        "remark": "Test Remark 2",
        "mstEmployee": {
          "employeeID": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
          "firstName": "Angelina",
          "lastName": "Jolie",
          "employeeCode": "Emp003",
          "dateOfBirth": "1987-05-15T12:49:14.1301741",
          "gender": "Female",
          "mobile": "95135782460",
          "email": "angelina.jolie@kenyapolice.com",
          "residencePhone": "020-22565784",
          "organizationJoiningDate": "2012-05-15T12:49:14.1301741",
          "serviceJoiningDate": "2012-05-15T12:49:14.1301741",
          "address1": "Salama House, Wabera Street Nairobi.",
          "address2": null,
          "mstArea": {
            "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
            "areaName": "Laisamis",
            "areaCode": "LSMS",
            "pinCode": "6 0502",
            "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
            "createdOn": "2017-05-15T06:49:13.9671647",
            "isDelete": false,
            "updatedBy": null,
            "updatedOn": null,
            "createdByName": null,
            "updatedByName": null
          },
          "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
          "mstDepartment": {
            "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
            "departmentName": "Criminal Investigation Department",
            "departmentDespcription": "Responsible for investigating complex cases.",
            "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
            "createdOn": "2017-05-15T06:49:13.4311341",
            "isDelete": false,
            "updatedBy": null,
            "updatedOn": null,
            "createdByName": null,
            "updatedByName": null
          },
          "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
          "mstDesignation": {
            "designationID": "aff1592e-ba8e-4791-831c-5df49da69054",
            "designationName": "Senior Assistant Inspector-General",
            "designationCode": "SAIG",
            "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
            "createdOn": "2017-05-15T06:49:14.0471693",
            "isDelete": false,
            "updatedBy": null,
            "updatedOn": null,
            "createdByName": null,
            "updatedByName": null
          },
          "designationID": "aff1592e-ba8e-4791-831c-5df49da69054",
          "mstShift": {
            "shiftID": "95998825-255a-401f-aab1-5ef4c2a56285",
            "shiftName": "Officers Morning Shift",
            "startTime": "04:00:00",
            "endTime": "12:00:00",
            "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
            "createdOn": "2017-05-15T06:49:14.0901718",
            "isDelete": false,
            "updatedBy": null,
            "updatedOn": null,
            "createdByName": null,
            "updatedByName": null
          },
          "shiftID": "95998825-255a-401f-aab1-5ef4c2a56285",
          "appUser": {
            "firstName": "Angelina",
            "lastName": "Jolie",
            "lastLogin": "0001-01-01T00:00:00",
            "failedPasswordAttemptCount": 0,
            "id": "56c385ae-ce46-41d4-b7fe-08df9aef7201",
            "userName": "angelinajolie",
            "normalizedUserName": "ANGELINAJOLIE",
            "email": "angelina.jolie@kenyapolice.com",
            "normalizedEmail": "ANGELINA.JOLIE@KENYAPOLICE.COM",
            "emailConfirmed": false,
            "passwordHash": "AQAAAAEAACcQAAAAEPK+XKCNihotEQ6h0vJmf6QfBo3qe9324I5fNZPGFG9WqJhXYOpCdnkGVTzrD12DXw==",
            "securityStamp": "1745f4bc-dc7b-4c2c-8b99-a109a64cd0e8",
            "concurrencyStamp": "001a33bb-f6ee-4c42-883f-7196f4b46da8",
            "phoneNumber": null,
            "phoneNumberConfirmed": false,
            "twoFactorEnabled": false,
            "lockoutEnd": null,
            "lockoutEnabled": true,
            "accessFailedCount": 0,
            "roles": [],
            "claims": [],
            "logins": []
          },
          "userID": "56c385ae-ce46-41d4-b7fe-08df9aef7201",
          "mstOccurrenceBooks": [],
          "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef1111",
          "createdOn": "2017-05-15T06:49:14.1311741",
          "isDelete": false,
          "updatedBy": null,
          "updatedOn": null,
          "createdByName": null,
          "updatedByName": null
        },
        "assignedTO": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
        "assignedComments": "Assigned to SAIG in CID",
        "mapZoomLevel": 11,
        "lattitude": 18.550335,
        "longitude": 73.809956,
        "location": "Near IARIRS Baner",
        "assignedTime": "2017-05-15T07:49:14.6962064",
        "priority": 3,
        "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef6666",
        "createdOn": "2017-05-15T07:49:14.6962064",
        "isDelete": false,
        "updatedBy": null,
        "updatedOn": null,
        "createdByName": null,
        "updatedByName": null
      }
    ],
    "createdOn": "2017-05-15T06:49:14.1311741",
  }]