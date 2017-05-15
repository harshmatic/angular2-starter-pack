// import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';
// import {By} from '@angular/platform-browser';
// import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
// import {RouterTestingModule} from '@angular/router/testing';
// import { HttpModule } from '@angular/http';
// import { Router, ActivatedRoute } from '@angular/router';
// import {CommonModule} from '@angular/common';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { SharedModule } from '../../../../app/shared/shared.module';
// import {ViewActivityFeedComponent} from './viewActivity.component';
// import { AuthService } from '../../../../app/core/index';
// import { ActivityEffects } from '../../../activity/store/activity.effects';
// import { MessageService } from '../../../../app/core/services/index';
// import { ActivityReducer } from '../../../activity/store/activity.reducer';
// import { ActivityService } from '../../../activity/services/activity.service';

// @Component({selector: 'test-cmp', template: '<view-activity-feed></view-activity-feed>'})
// class TestComponent {}

// @Directive({selector: '[routerLink]'})
// class RouterLinkStubDirective {}
// class MessageServiceStub {
//     addMessage(data : any) {
//         return;
//     }
// }
// class AuthServiceStub {
//      getCurrentUser() {
//        return {areaID:'1234'}
//     }
//   onAuthStatusChanged$ () {
//      return new Observable<any>((observer:any) => {
//        observer.next(true);
//      });
//   }
// }
// class ActivityServiceStub {
//     getActivityByOB(pageNum?:any,pageSize?:any,id?:any){
//        return new Observable<any>((observer:any) => {
//          observer.next(true);
//        });
//     }
// }

// describe('Component: View Activity Component', () => {
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 EffectsModule.run(ActivityEffects),
//                 StoreModule.provideStore({activity:ActivityReducer}),
//                 SharedModule,RouterTestingModule, CommonModule,
//                 FormsModule, ReactiveFormsModule, HttpModule
//             ],
//             schemas: [NO_ERRORS_SCHEMA],
//             declarations: [
//                 ViewActivityFeedComponent, TestComponent, RouterLinkStubDirective
//             ],
//             providers: [
//                {
//                     provide: MessageService,
//                     useClass: MessageServiceStub
//                 },
//                 {
//                     provide: ActivityService,
//                     useClass: ActivityServiceStub
//                 },
//                  { provide: ActivatedRoute, useValue: { 'queryParams': Observable.from([{ 'OccurenceBookID': 232 }]) } }
//             ]
//         });
//     });
//     it('should have a defined component', async(() => {
//         TestBed.compileComponents()
//             .then(() => {
//                 let fixture = TestBed.createComponent(TestComponent);
//                 fixture.detectChanges();
//                 expect(fixture.nativeElement).toBeTruthy();
//                 expect(TestComponent).toBeDefined();
//             });
//     }));
//     it('check component init', async(() => {
//         TestBed.compileComponents()
//             .then(() => {
//                 let fixture = TestBed.createComponent(ViewActivityFeedComponent);
//                 fixture.detectChanges();
//                 let componentInstance = fixture.componentInstance;
//                 expect(componentInstance.obId).toBe(232);;
//             });
//     }));
// });


