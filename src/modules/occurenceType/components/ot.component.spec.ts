import { Component, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../app/shared/shared.module';
import { OccurenceTypeComponent } from './ot.component';
import { AuthService } from '../../../app/core/index';
import { OccurenceTypeEffects } from '../store/occurenceType.effects';
import { OccurenceTypeService } from '../services/occurenceType.service';
import { OccurenceTypeReducer } from '../store/occurenceType.reducer';
import { MessageService } from '../../../app/core/services/index';

@Component({ selector: 'test-cmp', template: '<app-occurence-type></app-occurence-type>' })
class TestComponent { }

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective { }
var message = ''
var value = { 'ot': 'Robbery' };
var valid = true;
class MessageServiceStub {
    addMessage(data: any) {
        message = data.detail;
        return;
    }
}
class AuthServiceStub {
    getCurrentUser() {
        return { areaID: '1234' }
    }
    onAuthStatusChanged$() {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
}
class OTServiceStub {
    getOts() {
        return new Observable<any>((observer: any) => {
            observer.next(testData);
        });
    }
    saveOt(id, ot) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
    addOt(ot) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
    deleteOt(id) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
}
describe('Component: OT Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(OccurenceTypeEffects),
                StoreModule.provideStore({ employee: OccurenceTypeReducer }),
                SharedModule, RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule, HttpModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                OccurenceTypeComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: MessageService,
                    useClass: MessageServiceStub
                },
                {
                    provide: AuthService,
                    useClass: AuthServiceStub
                },
                {
                    provide: OccurenceTypeService,
                    useClass: OTServiceStub
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
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.occurenceType).not.toBe(null);
            });
    }));
    it('it should check getOtList method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.occurenceType).not.toBe(null);
            });
    }));
    it('it should check onEdit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.otID = '758b1995-7f92-4d87-9588-b90800abf111';
                componentInstance.isEdited = true;
                componentInstance.otForm.controls['ot'].setValue('Robbery');
            });
    }));
    it('it should check resetForm method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.otForm.controls['ot'].setValue('');
            });
    }));
    it('it should check onDelete method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.otID = '758b1995-7f92-4d87-9588-b90800abf111';
                componentInstance.onDelete(componentInstance.otID);
                expect(message).toBe('Occcurence type deleted');
            });
    }));
    it('it should check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.isEdited = false;
                componentInstance.onSubmit({ value, valid });
                expect(message).toBe('Occurence type added');
                componentInstance.isEdited = true;
                componentInstance.onSubmit({ value, valid });
                expect(message).toBe('Occurence type updated');

            });
    }));
    it('it should check validate method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceTypeComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.otForm.controls['ot'].setValue('Robbery');
                let result = componentInstance.otForm.invalid;
                expect(result).toBe(false);
            });
    }));
});

var testData = [
  {
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf111",
    "obTypeName": "Carjacking",
    "createdOn": "2017-05-22T05:17:44.6480504",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf444",
    "obTypeName": "Corruption",
    "createdOn": "2017-05-22T05:17:44.6480504",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf666",
    "obTypeName": "Drug abuse",
    "createdOn": "2017-05-22T05:17:44.6480504",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf333",
    "obTypeName": "Ethnic violence",
    "createdOn": "2017-05-22T05:17:44.6480504",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf555",
    "obTypeName": "Terrorism",
    "createdOn": "2017-05-22T05:17:44.6480504",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "obTypeID": "758b1995-7f92-4d87-9588-b90800abf222",
    "obTypeName": "Theft and banditry",
    "createdOn": "2017-05-22T05:17:44.6480504",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  }
]