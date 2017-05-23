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
import { SharedModule } from '../../../../app/shared/shared.module';
import { StatusComponent } from './status.component';
import { AuthService } from '../../../../app/core/index';
import { StatusEffects } from '../../store/status.effects';
import { StatusService } from '../../services/status.service';
import { StatusReducer } from '../../store/status.reducer';
import { MessageService } from '../../../../app/core/services/index';

@Component({ selector: 'test-cmp', template: '<app-status></app-status>' })
class TestComponent { }

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective { }
var message = ''
var value = { 'statusName': 'assign' };
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
class StatusServiceStub {
    getStatusAll() {
        return new Observable<any>((observer: any) => {
            observer.next(testData);
        });
    }
    saveStatus(id, st) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
    addStatus(st) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
    deleteStatus(id) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
}

describe('Component: Status Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(StatusEffects),
                StoreModule.provideStore({ employee: StatusReducer }),
                SharedModule, RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule, HttpModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                StatusComponent, TestComponent, RouterLinkStubDirective
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
                    provide: StatusService,
                    useClass: StatusServiceStub
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
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.status).not.toBe(null);
            });
    }));
    it('it should check getStatusList method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.status).not.toBe(null);
            });
    }));
    it('it should check resetForm method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.statusForm.controls['statusName'].setValue('');
            });
    }));
    it('it should check onEdit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.statusID = '853bdecf-1ed1-46c4-b200-e8be243f1111';
                componentInstance.isEdited = true;
                componentInstance.statusForm.controls['statusName'].setValue('Assigned');
            });
    }));
    it('it should check onDelete method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.statusID = '853bdecf-1ed1-46c4-b200-e8be243f1111';
                componentInstance.onDelete(componentInstance.statusID);
                expect(message).toBe('Status Deleted');
            });
    }));
    it('it should check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.isEdited = false;
                componentInstance.onSubmit({ value, valid });
                expect(message).toBe('Status Added');
                componentInstance.isEdited = true;
                componentInstance.statusID = '853bdecf-1ed1-46c4-b200-e8be243f1111';
                componentInstance.statusObj = { 'statusName': 'Assign' };
                componentInstance.onSubmit({ value, valid });
                expect(message).toBe('Status Updated');

            });
    }));
    it('it should check validate method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(StatusComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.statusForm.controls['statusName'].setValue('assign');
                let result = componentInstance.statusForm.invalid;
                expect(result).toBe(false);
            });
    }));
});

var testData = [{ "statusID": "853bdecf-1ed1-46c4-b200-e8be243f1111", "statusName": "Assigned", "createdOn": "2017-05-19T10:35:22.3032117", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "statusID": "853bdecf-1ed1-46c4-b200-e8be243f1223", "statusName": "Completed", "createdOn": "2017-05-19T10:35:22.3032117", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "statusID": "853bdecf-1ed1-46c4-b200-e8be243f1221", "statusName": "In Court", "createdOn": "2017-05-19T10:35:22.3032117", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "statusID": "853bdecf-1ed1-46c4-b200-e8be243f1222", "statusName": "In Progress", "createdOn": "2017-05-19T10:35:22.3032117", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "statusID": "853bdecf-1ed1-46c4-b200-e8be243fddad", "statusName": "Open", "createdOn": "2017-05-19T10:35:22.3032117", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "statusID": "ebeed096-ea34-43e2-948e-32bb98f31401", "statusName": "Reviewed", "createdOn": "2017-05-19T10:35:22.3032117", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }];