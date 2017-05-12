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
import {JobDetailComponent} from './jobDetail.component';
import { AuthService } from '../../../../app/core/index';
import { OccurenceBookEffects } from '../../../occurenceBook/store/occurenceBook.effects';
import { OccurenceBookService } from '../../../occurenceBook/services/occurenceBook.service';

@Component({selector: 'test-cmp', template: '<app-job-detail></app-job-detail>'})
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
      console.log('------------------------------------->>>>>>>>>>>>>>>'+areaId)
     return new Observable<any>((observer:any) => {
       observer.next([1,2,3]);
     });
  }
}

describe('Component: OB Detail Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(OccurenceBookEffects),
                StoreModule.provideStore({occurenceBook:[]}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                JobDetailComponent, TestComponent, RouterLinkStubDirective
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
    // it('checking ui', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(JobDetailComponent);
    //             fixture.detectChanges();
    //             let element = fixture.nativeElement;
    //             //expect(element.querySelector('.loginFooter').innerText).toEqual('Copyrights © 2017. All rights reserved.');
    //         });
    // }));

    // it('check component variable', async(() => {
    //     TestBed.compileComponents()
    //         .then(() => {
    //             let fixture = TestBed.createComponent(EsplLoginFormComponent);
    //             fixture.detectChanges();
    //             let componentInstance = fixture.componentInstance;
    //             expect(componentInstance.queryUrl).toBe('');
    //         });
    // }));
});