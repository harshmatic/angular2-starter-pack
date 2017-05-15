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
import {AssignedComponent} from './assigned.component';
import { AuthService } from '../../../../app/core/index';
import { OccurenceBookEffects } from '../../store/occurenceBook.effects';
import { OccurenceBookService } from '../../services/occurenceBook.service';
import { OccurenceBookReducer } from '../../../occurenceBook/store/occurenceBook.reducer';
import { Priority } from '../../../config';
import { Status } from '../../../config';
@Component({selector: 'test-cmp', template: '<app-assigned></app-assigned>'})
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
class OccurenceBookServiceStub {
  getObs(searchQuery?:any,pageNum?:any,pageSize?:any,areaId?:any) {
     return new Observable<any>((observer:any) => {
       observer.next(testData);
     });
  }
  getObsOff(searchQuery?:any,pageNum?:any,pageSize?:any,areaId?:any) {
     return new Observable<any>((observer:any) => {
       observer.next(testData);
     });
  }
}

describe('Component: Assigned Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(OccurenceBookEffects),
                StoreModule.provideStore({occurenceBook:OccurenceBookReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AssignedComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
               {
                    provide: AuthService,
                    useClass: AuthServiceStub
                },
                {
                    provide: OccurenceBookService,
                    useClass: OccurenceBookServiceStub
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
                let fixture = TestBed.createComponent(AssignedComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.jobPageNum).toBe(2);
                expect(componentInstance.stopScroll).toBe(false);
                expect(componentInstance.obs.length).toBe(1);
            });
    }));
        it('it should check onKeyup method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AssignedComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onKey({target:{value:'test'}});
                expect(componentInstance.queryString).toBe('test');
            });
    }));
    it('it should check getJobs method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AssignedComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.getJobs();
                expect(componentInstance.jobPageNum).toBe(2);
                expect(componentInstance.obs.length).toBe(1);
            });
    }));
    it('it should check applyPriority method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AssignedComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let result=componentInstance.applyPriority('test');
                expect(result).toBe('blue');
                let result2=componentInstance.applyPriority('Critical');
                expect(result2).toBe('red');
            });
    }));
    it('it should check applyIcon method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AssignedComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let result=componentInstance.applyIcon('test');
                expect(result).toBe("/assets/styles/images/blue.svg");
                let result2=componentInstance.applyIcon('Critical');
                expect(result2).toBe("/assets/styles/images/red.svg");
            });
    }));
    it('it should check applyStatus method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AssignedComponent);
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
    "obid": "411bfab2-0d44-4fb9-8835-184db90f5678",
    "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
    "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
    "statusID": "853bdecf-1ed1-46c4-b200-e8be243fddad",
    "obNumber": "456789",
    "obTime": "2017-04-10T19:25:14.9100866",
    "caseFileNumber": "2",
    "natureOfOccurrence": "Nature 2",
    "remark": "Test Remark 2",
    "assignedTO": "56c385ae-ce46-41d4-b7fe-08df9aef3333",
    "assignedComments": "Assigned to SAIG in CID",
    "mapZoomLevel": 11,
    "lattitude": 18.550335,
    "longitude": 73.809956,
    "location": "Near IARIRS Baner",
    "assignedTime": "2017-05-15T07:49:14.6962064",
    "mstArea": {
      "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
      "areaName": "Laisamis",
      "areaCode": "LSMS",
      "pinCode": "6 0502",
    },
    "mstDepartment": {
      "departmentID": "a1da1d8e-1111-4634-b538-a01709473333",
      "departmentName": "Criminal Investigation Department",
      "departmentDespcription": "Responsible for investigating complex cases."
    },
    "mstOccurrenceType": {
      "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
      "obTypeName": "Theft and banditry",
    },
    "mstStatus": {
      "statusID": "853bdecf-1ed1-46c4-b200-e8be243fddad",
      "statusName": "Open",
    },
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
      "mstDesignation": null,
      "designationID": "aff1592e-ba8e-4791-831c-5df49da69054",
      "mstShift": null,
      "shiftID": "95998825-255a-401f-aab1-5ef4c2a56285",
      "userID": "56c385ae-ce46-41d4-b7fe-08df9aef7201",
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
      "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef1111",
      "createdOn": "2017-05-15T06:49:14.1311741",
      "isDelete": false,
      "updatedBy": null,
      "updatedOn": null,
      "createdByName": null,
      "updatedByName": null
    },
    "priority": "Minor",
    "createdOn": "2017-05-15T07:49:14.6962064",
  }]