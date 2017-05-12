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
import {OccurenceDetailComponent} from './occurenceDetail.component';
import { AuthService } from '../../../../app/core/index';
import { OccurenceBookEffects } from '../../store/occurenceBook.effects';
import { OccurenceBookService } from '../../services/occurenceBook.service';
import { OccurenceBookReducer } from '../../../occurenceBook/store/occurenceBook.reducer';

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
     return new Observable<any>((observer:any) => {
       observer.next([]);
     });
  }
}

describe('Component: OB Detail Component', () => {
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
                OccurenceDetailComponent, TestComponent, RouterLinkStubDirective
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
    it('checking ui', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceDetailComponent);
                fixture.detectChanges();
                let element = fixture.nativeElement;
                expect(element.querySelector('.searchIcon').innerText).toEqual('search');
            });
    }));

    it('check component variable', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(OccurenceDetailComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.jobPageNum).toBe(1);
            });
    }));
});