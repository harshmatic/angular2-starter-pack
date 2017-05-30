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
import { CoreModule } from '../../../app/core/core.module';
import {AreaComponent} from './area.component';
import { AreaEffects } from '../store/area.effects';
import { AreaService } from '../services/area.service';
import { AreaReducer } from '../store/area.reducer';;
import { MessageService } from '../../../app/core/services/index';

@Component({selector: 'test-cmp', template: '<app-area></app-area>'})
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

class AreaServiceStub {
    getAreas() {
       return new Observable<any>((observer:any) => {
           observer.next(testAreaList);
      });
    }
    getAreaPagination(payload) {
      return new Observable<any>((observer:any) => {
           observer.next(testAreaList);
      });
    }
    addArea(area: any) {
      return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
    saveArea(id: any, area: any) {
       return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
    deleteArea(id: any) {
       return new Observable<any>((observer:any) => {
           observer.next(true);
      });
    }
}

describe('Component: DepartmentComponent Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(AreaEffects),
                StoreModule.provideStore({area:AreaReducer}),
                SharedModule,CoreModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AreaComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: AreaService,
                    useClass: AreaServiceStub
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
                let fixture = TestBed.createComponent(AreaComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.areaList.length).toBe(0);
            });
    }));
    it('check onEdit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AreaComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onEdit(testAreaList[0])
                expect(componentInstance.areaForm.value.areaName).toBe(testAreaList[0].areaName);
            });
    }));
    it('check resetForm method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AreaComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.resetForm()
                expect(componentInstance.areaForm.value.areaName).toBe('');
            });
    }));
    it('check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AreaComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value=testAreaList[0]
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.areaForm.value.departmentName).toBe('');
            });
    }));
     it('check onSubmit method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AreaComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value={areaID:0,areaName:'test',areaCode:'test desc'};
                let valid=true;
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.areaForm.value.areaName).toBe('');
            });
    }));
     it('check lazy load', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(AreaComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.loadLazy({first:1,rows:10})
                expect(componentInstance.tableRows).toBe(10);
            });
    }));
});

var testAreaList=[{
    "areaID": "56c385ae-ce46-41d4-b7fe-08df9aef9579",
    "areaName": "Ladhri Awasi",
    "areaCode": "LASI",
    "pinCode": "4 0122",
    "createdOn": "2017-05-30T05:49:14.074725",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "areaID": "411bfab2-0d44-4fb9-8835-184db90f44fa",
    "areaName": "Laikipia Campus",
    "areaCode": "LKPC",
    "pinCode": "2 0330",
    "createdOn": "2017-05-30T05:49:14.07474",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "areaID": "89234f93-6a6a-4960-a7d3-20f98f2760a8",
    "areaName": "Laisamis",
    "areaCode": "LSMS",
    "pinCode": "6 0502",
    "createdOn": "2017-05-30T05:49:14.074743",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  }]