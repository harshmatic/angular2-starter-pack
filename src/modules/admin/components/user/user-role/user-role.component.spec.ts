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
import {UserRoleComponent} from './user-role.component';
import { UserEffects } from '../../../store/user/user.effects';
import { UserService } from '../../../services/user.service';
import { UserReducer } from '../../../store/user/user.reducer';
import { RoleEffects } from '../../../store/role/role.effects';
import { RoleService } from '../../../services/role.service';
import { RoleReducer } from '../../../store/role/role.reducer';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({selector: 'test-cmp', template: '<user-role></user-role>'})
class TestComponent {}

@Directive({selector: '[routerLink]'})
export class RouterLinkStubDirective {}

class UserServiceStub {
    getUserByID(userId:string){
        return new Observable<any>((observer:any) => {
           observer.next(testUser);
        });
    }
    getUserRoles(userID: string) {
        return new Observable<any>((observer:any) => {
           observer.next(testUserRole);
        });
    }
    addUserRole(userID: string,payload:any) {
        return new Observable<any>((observer:any) => {
           observer.next(true);
        });
    }
    deleteUserRole(userID: string,payload:any) {
        return new Observable<any>((observer:any) => {
            testUserRole=[]
           observer.next(true);
        });
    }
    addUser(payload:any) {
        return new Observable<any>((observer:any) => {
           observer.next(true);
        });
    }
    editUser(payload:any) {
        return new Observable<any>((observer:any) => {
           observer.next(true);
        });
    }
}

class RoleServiceStub {
    getRoles() {
        return new Observable<any>((observer:any) => {
           observer.next(testRoleList);
         });
    }
}
describe('Component: UserRoleComponent Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(UserEffects),
                EffectsModule.run(RoleEffects),
                StoreModule.provideStore({user:UserReducer,role:RoleReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                UserRoleComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: UserService,
                    useClass: UserServiceStub
                },
                {
                    provide: RoleService,
                    useClass: RoleServiceStub
                }, 
                { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'userId': 232 }]) } }
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
                let fixture = TestBed.createComponent(UserRoleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                expect(componentInstance.userForm.value.id).toBe(testUser.id);
                expect(componentInstance.params).toBe(232);
            });
    }));
    it('check getAllRoles method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(UserRoleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.getAllRoles()
                expect(componentInstance.roleList).toBe(testRoleList);
            });
    }));
    it('check getUser method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(UserRoleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.getUser()
                expect(componentInstance.userForm.value.id).toBe(testUser.id);
            });
    }));
    it('check getUserRole method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(UserRoleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.getUserRole()
                expect(componentInstance.userRoles).toBe(testUserRole);
            });
    }));
    it('check onRevokeRole method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(UserRoleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.onRevokeRole(testUserRole[0])
                expect(componentInstance.userRoles.length).toBe(0);
            });
    }));
    it('check onAssignRole method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(UserRoleComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.selectedRole=testRoleList[0]
                componentInstance.onAssignRole()
                expect(componentInstance.selectedRole).toBe(null);
            });
    }));
    
});

var testUser={
    "id": "56c385ae-ce46-41d4-b7fe-08df9aef7201",
    "firstName": "Angelina",
    "lastName": "Jolie",
    "email": "angelina.jolie@kenyapolice.com",
    "userName": "angelinajolie"
  }
var testUserRole=[
  "SuperAdmin"
]

var testRoleList=[
  {
    "id": "5bfb1638-acf2-4899-88ef-817c471c0b26",
    "name": "ASP"
  },
  {
    "id": "888bcf6d-9a16-4a30-bc63-994c4a7ecb94",
    "name": "Constable"
  },
  {
    "id": "8ea6c336-9bc0-4472-9ff5-7fae96f5e52b",
    "name": "DIG"
  },
  {
    "id": "8ea6c336-9bc0-4472-9ff5-7fae96f5asdb",
    "name": "SuperAdmin"
  }]
