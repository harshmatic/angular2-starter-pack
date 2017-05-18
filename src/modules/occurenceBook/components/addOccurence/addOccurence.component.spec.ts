import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../../../app/core/services/index';
import { AuthService } from '../../../../app/core/index';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../../app/shared/shared.module';
import {AddOccurenceComponent} from './addOccurence.component';
import { DepartmentEffects } from '../../../department/store/department.effects';
import { DepartmentService } from '../../../department/services/department.service';
import { DepartmentReducer } from '../../../department/store/department.reducer';
import { AreaEffects } from '../../../area/store/area.effects';
import { AreaService } from '../../../area/services/area.service';
import {  AreaReducer } from '../../../area/store/area.reducer';
import { OccurenceTypeEffects } from '../../../occurenceType/store/occurenceType.effects';
import { OccurenceTypeService } from '../../../occurenceType/services/occurenceType.service';
import { OccurenceTypeReducer } from '../../../occurenceType/store/occurenceType.reducer';
import { OccurenceBookEffects } from '../../store/occurenceBook.effects';
import { OccurenceBookService } from '../../services/occurenceBook.service';
import { OccurenceBookReducer } from '../../../occurenceBook/store/occurenceBook.reducer';
import {Router} from "@angular/router";
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

@Component({selector: 'test-cmp', template: '<add-job-detail></add-job-detail>'})
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
class OccurenceBookStub {
  addJob(payload: any) {
     return new Observable<any>((observer:any) => {
       observer.next(testDpt);
     });
  }
}
class DepartmentServiceStub {
  getDepartments() {
     return new Observable<any>((observer:any) => {
       observer.next(testDpt);
     });
  }
}
class AreaServiceStub {
  getAreas() {
     return new Observable<any>((observer:any) => {
       observer.next(testArea);
     });
  }
}
class OccurenceTypeServiceStub {
  getOts() {
    return new Observable<any>((observer:any) => {
        observer.next(testOt);
        });
}
}


describe('Component:  Add Occurrence Book', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(DepartmentEffects),
                StoreModule.provideStore({department:DepartmentReducer}),
                EffectsModule.run(AreaEffects),
                StoreModule.provideStore({area:AreaReducer}),
                EffectsModule.run(OccurenceTypeEffects),
                StoreModule.provideStore({occurenceType:OccurenceTypeReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule,HttpModule,AgmCoreModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AddOccurenceComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [MapsAPILoader,
                {
                    provide: MessageService,
                    useClass: MessageServiceStub
                },
               {
                    provide: AuthService,
                    useClass: AuthServiceStub
                },
                {
                    provide: DepartmentService,
                    useClass: DepartmentServiceStub
                },
                {
                    provide: AreaService,
                    useClass: AreaServiceStub
                },
                {
                    provide: OccurenceBookService,
                    useClass: OccurenceBookStub
                },
                {
                    provide: OccurenceTypeService,
                    useClass: OccurenceTypeServiceStub
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
                let fixture = TestBed.createComponent(AddOccurenceComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.departments.length).toBe(1);
                expect(componentInstance.area.length).toBe(1);
                expect(componentInstance.occurrenceTypes.length).toBe(1);
            });
    }));
    //     it('it should check onKeyup method', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(AddOccurenceComponent);
    //             fixture.detectChanges();
    //             let componentInstance = fixture.componentInstance;
    //             componentInstance.onKey({target:{value:'test'}});
    //             expect(componentInstance.queryString).toBe('test');
    //         });
    // }));
    // it('it should check getJobs method', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(AddOccurenceComponent);
    //             fixture.detectChanges();
    //             let componentInstance = fixture.componentInstance;
    //             componentInstance.getJobs();
    //             expect(componentInstance.jobPageNum).toBe(2);
    //             expect(componentInstance.obs.length).toBe(1);
    //         });
    // }));
    // it('it should check applyPriority method', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(AddOccurenceComponent);
    //             fixture.detectChanges();
    //             let componentInstance = fixture.componentInstance;
    //             let result=componentInstance.applyPriority('test');
    //             expect(result).toBe('blue');
    //             let result2=componentInstance.applyPriority('Critical');
    //             expect(result2).toBe('red');
    //         });
    // }));
    // it('it should check applyIcon method', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(AddOccurenceComponent);
    //             fixture.detectChanges();
    //             let componentInstance = fixture.componentInstance;
    //             let result=componentInstance.applyIcon('test');
    //             expect(result).toBe("/assets/styles/images/blue.svg");
    //             let result2=componentInstance.applyIcon('Critical');
    //             expect(result2).toBe("/assets/styles/images/red.svg");
    //         });
    // }));
    // it('it should check applyStatus method', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(AddOccurenceComponent);
    //             fixture.detectChanges();
    //             let componentInstance = fixture.componentInstance;
    //             let result=componentInstance.applyStatus('test');
    //             expect(result).toBe('statusOpen');
    //             let result2=componentInstance.applyStatus('Assigned');
    //             expect(result2).toBe("statusAssigned");
    //         });
    // }));
    
});


var testDpt=[{demo:1}];
var testArea=[{demo:1}];
var testOt=[{demo:1}];