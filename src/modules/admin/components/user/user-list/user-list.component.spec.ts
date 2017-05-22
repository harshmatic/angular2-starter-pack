import {Component, Directive, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../../../app/shared/shared.module';
import {UserListComponent} from './user-list.component';
import { UserEffects } from '../../../store/user/user.effects';
import { UserService } from '../../../services/user.service';
import { UserReducer } from '../../../store/user/user.reducer';

@Component({selector: 'test-cmp', template: '<user-list></user-list>'})
class TestComponent {}

@Directive({selector: '[routerLink]'})
export class RouterLinkStubDirective {}

class UserServiceStub {
    getUsers() {
      return new Observable<any>((observer:any) => {
           observer.next(testData);
      });
    }
}

describe('Component: UserListComponent Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(UserEffects),
                StoreModule.provideStore({user:UserReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                UserListComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: UserService,
                    useClass: UserServiceStub
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
                let fixture = TestBed.createComponent(UserListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.userList.length).toBe(2);
            });
    }));
});

var testData=[{
    "id": "56c385ae-ce46-41d4-b7fe-08df9aef7201",
    "firstName": "Angelina",
    "lastName": "Jolie",
    "email": "angelina.jolie@kenyapolice.com",
    "userName": "angelinajolie"
  },
  {
    "id": "56c385ae-ce46-41d4-b7fe-08df9aef7303",
    "firstName": "Brad",
    "lastName": "Pitt",
    "email": "brad.pitt@kenyapolice.com",
    "userName": "bradpitt"
  }]