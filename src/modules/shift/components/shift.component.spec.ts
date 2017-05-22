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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../app/shared/shared.module';
import { ShiftComponent } from './shift.component';
import { AuthService } from '../../../app/core/index';
import { ShiftEffects } from '../store/shift.effects';
import { ShiftService } from '../services/shift.service';
import { ShiftReducer } from '../store/shift.reducer';
import { MessageService } from '../../../app/core/services/index';

@Component({ selector: 'test-cmp', template: '<app-shift></app-shift>' })
class TestComponent { }

@Directive({ selector: '[routerLink]' })
export class RouterLinkStubDirective { }
var message = ''
var value = {
    'shiftName': 'Afternoon', 'startTime': new Date('2017-05-22T05:17:44.6780504'),
    'endTime': new Date('2017-05-22T05:17:44.6780504')
};
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
class ShiftServiceStub {
    getShifts() {
        return new Observable<any>((observer: any) => {
            observer.next(testData);
        });
    }
    saveShift(id, shift) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
    addShift(shift) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
    deleteShift(id) {
        return new Observable<any>((observer: any) => {
            observer.next(true);
        });
    }
}
describe('Component: shift Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(ShiftEffects),
                StoreModule.provideStore({ employee: ShiftReducer }),
                SharedModule, RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule, HttpModule, BrowserAnimationsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                ShiftComponent, TestComponent, RouterLinkStubDirective
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
                    provide: ShiftService,
                    useClass: ShiftServiceStub
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
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.shift).not.toBe(null);
            });
    }));
    it('it should check getShiftList method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.shift).not.toBe(null);
            });
    }));
    it('it should check resetForm method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.shiftForm.controls['shiftName'].setValue('');
            });
    }));
    it('it should check onEdit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.shiftID = 'b5fedc70-d3a0-4806-bcf4-d1a30ce90555';
                componentInstance.isEdited = true;
                componentInstance.shiftForm.controls['shiftName'].setValue('Afternoon shift');
                componentInstance.shiftForm.controls['startTime'].setValue(new Date('2017-05-22T05:17:44.6780504'));
                componentInstance.shiftForm.controls['endTime'].setValue(new Date('2017-05-22T05:17:44.6780504'));
            });
    }));
    it('it should check onDelete method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.shiftID = 'b5fedc70-d3a0-4806-bcf4-d1a30ce90555';
                componentInstance.onDelete(componentInstance.shiftID);
                expect(message).toBe('Shift Deleted');
            });
    }));
    it('it should check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.isEdited = false;
                componentInstance.onSubmit({ value, valid });
                expect(message).toBe('Shift Added');
                componentInstance.isEdited = true;
                componentInstance.onSubmit({ value, valid });
                expect(message).toBe('Shift Updated');

            });
    }));
    it('it should check validate method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(ShiftComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.shiftForm.controls['shiftName'].setValue('Afternoon');
                componentInstance.shiftForm.controls['startTime'].setValue(new Date('2017-05-22T05:17:44.6780504'));
                componentInstance.shiftForm.controls['endTime'].setValue(new Date('2017-05-22T05:17:44.6780504'));
                let result = componentInstance.shiftForm.invalid;
                expect(result).toBe(false);
            });
    }));
});

var testData = [{ "shiftID": "b5fedc70-d3a0-4806-bcf4-d1a30ce90555", "shiftName": "Officers General Shift shift", "mondayStartTime": "00:00:00", "mondayEndTime": "00:00:00", "tuesdayStartTime": "00:00:00", "tuesdayEndTime": "00:00:00", "wednesdayStartTime": "00:00:00", "wednesdayEndTime": "00:00:00", "thursdayStartTime": "00:00:00", "thursdayEndTime": "00:00:00", "fridayStartTime": "00:00:00", "fridayEndTime": "00:00:00", "saturdayStartTime": "00:00:00", "saturdayEndTime": "00:00:00", "sundayStartTime": "00:00:00", "sundayEndTime": "00:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": "2017-05-22T11:21:03.7882624", "updatedBy": "56c385ae-ce46-41d4-b7fe-08df9aef8888", "isDelete": false, "createdByName": null, "updatedByName": null }, { "shiftID": "b5fedc70-d3a0-4806-bcf4-d1a30ce90222", "shiftName": "Officers Mid-Day Shift", "mondayStartTime": "12:00:00", "mondayEndTime": "20:00:00", "tuesdayStartTime": "12:00:00", "tuesdayEndTime": "20:00:00", "wednesdayStartTime": "12:00:00", "wednesdayEndTime": "20:00:00", "thursdayStartTime": "12:00:00", "thursdayEndTime": "20:00:00", "fridayStartTime": "12:00:00", "fridayEndTime": "20:00:00", "saturdayStartTime": "12:00:00", "saturdayEndTime": "20:00:00", "sundayStartTime": "00:00:00", "sundayEndTime": "00:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "shiftID": "95998825-255a-401f-aab1-5ef4c2a56285", "shiftName": "Officers Morning Shift", "mondayStartTime": "04:00:00", "mondayEndTime": "12:00:00", "tuesdayStartTime": "04:00:00", "tuesdayEndTime": "12:00:00", "wednesdayStartTime": "04:00:00", "wednesdayEndTime": "12:00:00", "thursdayStartTime": "04:00:00", "thursdayEndTime": "12:00:00", "fridayStartTime": "04:00:00", "fridayEndTime": "12:00:00", "saturdayStartTime": "04:00:00", "saturdayEndTime": "12:00:00", "sundayStartTime": "00:00:00", "sundayEndTime": "00:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "shiftID": "b5fedc70-d3a0-4806-bcf4-d1a30ce90444", "shiftName": "Officers Night Shift", "mondayStartTime": "20:00:00", "mondayEndTime": "04:00:00", "tuesdayStartTime": "20:00:00", "tuesdayEndTime": "04:00:00", "wednesdayStartTime": "20:00:00", "wednesdayEndTime": "04:00:00", "thursdayStartTime": "20:00:00", "thursdayEndTime": "04:00:00", "fridayStartTime": "20:00:00", "fridayEndTime": "04:00:00", "saturdayStartTime": "00:00:00", "saturdayEndTime": "00:00:00", "sundayStartTime": "20:00:00", "sundayEndTime": "04:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "shiftID": "95998825-255a-401f-aab1-5ef4c2a56111", "shiftName": "Regular Mid-Day Shift", "mondayStartTime": "12:00:00", "mondayEndTime": "20:00:00", "tuesdayStartTime": "12:00:00", "tuesdayEndTime": "20:00:00", "wednesdayStartTime": "12:00:00", "wednesdayEndTime": "20:00:00", "thursdayStartTime": "12:00:00", "thursdayEndTime": "20:00:00", "fridayStartTime": "12:00:00", "fridayEndTime": "20:00:00", "saturdayStartTime": "12:00:00", "saturdayEndTime": "20:00:00", "sundayStartTime": "00:00:00", "sundayEndTime": "00:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "shiftID": "318dc4df-684a-444f-9e5a-18bb5eed1123", "shiftName": "Regular Morning Shift", "mondayStartTime": "04:00:00", "mondayEndTime": "12:00:00", "tuesdayStartTime": "04:00:00", "tuesdayEndTime": "12:00:00", "wednesdayStartTime": "04:00:00", "wednesdayEndTime": "12:00:00", "thursdayStartTime": "04:00:00", "thursdayEndTime": "12:00:00", "fridayStartTime": "04:00:00", "fridayEndTime": "12:00:00", "saturdayStartTime": "04:00:00", "saturdayEndTime": "12:00:00", "sundayStartTime": "04:00:00", "sundayEndTime": "12:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }, { "shiftID": "b5fedc70-d3a0-4806-bcf4-d1a30ce90333", "shiftName": "Regular Night Shift", "mondayStartTime": "20:00:00", "mondayEndTime": "04:00:00", "tuesdayStartTime": "20:00:00", "tuesdayEndTime": "04:00:00", "wednesdayStartTime": "20:00:00", "wednesdayEndTime": "04:00:00", "thursdayStartTime": "20:00:00", "thursdayEndTime": "04:00:00", "fridayStartTime": "20:00:00", "fridayEndTime": "04:00:00", "saturdayStartTime": "20:00:00", "saturdayEndTime": "04:00:00", "sundayStartTime": "00:00:00", "sundayEndTime": "00:00:00", "createdOn": "2017-05-22T05:17:44.6780504", "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999", "updatedOn": null, "updatedBy": "00000000-0000-0000-0000-000000000000", "isDelete": false, "createdByName": null, "updatedByName": null }];