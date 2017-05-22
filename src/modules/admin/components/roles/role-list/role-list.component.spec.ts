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
import {RoleListComponent} from './role-list.component';
import { AppModuleEffects } from '../../../store/appModule/appModule.effects';
import { RoleEffects } from '../../../store/role/role.effects';
import { AppModuleService } from '../../../services/appModule.service';
import { RoleService } from '../../../services/role.service';
import { AppModuleReducer } from '../../../store/appModule/appModule.reducer';
import { RoleReducer } from '../../../store/role/role.reducer';

@Component({selector: 'test-cmp', template: '<app-module-list></app-module-list>'})
class TestComponent {}

@Directive({selector: '[routerLink]'})
export class RouterLinkStubDirective {}

class AppModuleServiceStub {
    getModules() {
      return new Observable<any>((observer:any) => {
           observer.next(appModuleList);
      });
    }
}
class RoleServiceStub {
    getRoles() {
        return new Observable<any>((observer:any) => {
           observer.next(roleList);
         });
    }
    getRolePermissions(id: string) {
       return new Observable<any>((observer:any) => {
           observer.next(rolePermissions);
         });
    }
    addPermissionToRole(roleID: string,payload:any) {
        return new Observable<any>((observer:any) => {
           observer.next(roleList);
        });
    }
    deleteRolePermission(id: string,payload:any) {
      return new Observable<any>((observer:any) => {
           observer.next(roleList);
      });
    }
    addRole(payload:any){
        return new Observable<any>((observer:any) => {
           roleList.push(payload)
           observer.next(roleList);
        });
    }
}

describe('Component: RoleListComponent ', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.run(AppModuleEffects),
                EffectsModule.run(RoleEffects),
                StoreModule.provideStore({appModule:AppModuleReducer,role:RoleReducer}),
                SharedModule,RouterTestingModule, CommonModule,
                FormsModule, ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                RoleListComponent, TestComponent, RouterLinkStubDirective
            ],
            providers: [
                {
                    provide: AppModuleService,
                    useClass: AppModuleServiceStub
                },
                {
                    provide: RoleService,
                    useClass: RoleServiceStub
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
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.selectedRole={"id": "5bfb1638-acf2-4899-88ef-817c471c0b26",
                       "name": "ASP" }
                expect(componentInstance.appModuleList.length).toBe(2);
            });
    }));
     it('check getRolePermission() method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.selectedRole={"id": "5bfb1638-acf2-4899-88ef-817c471c0b26",
                       "name": "ASP" }
                componentInstance.getRolePermission()
                expect(componentInstance.rolePermissions.length).toBe(3);
            });
    }));
    it('check resetForm() method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                componentInstance.resetForm()
                expect(componentInstance.roleForm.value.name).toBe('');
            });
    }));
    it('check managePermission() method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let role={"id": "5bfb1638-acf2-4899-88ef-817c471c0b26",
                          "name": "ASP" }
                componentInstance.managePermission(role)
                expect(componentInstance.selectedRole.name).toBe("ASP");
            });
    }));
    it('check onSubmit() method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value={id:123,name:'test'}
                let valid=true
                componentInstance.onSubmit({value,valid})
                expect(componentInstance.roleList.length).toBe(4);
            });
    }));
     it('check onAddPermission() method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let value={id:123,name:'test'}
                let valid=true
                 componentInstance.selectedRole={"id": "5bfb1638-acf2-4899-88ef-817c471c0b26",
                       "name": "ASP" }
                componentInstance.onAddPermission()
                expect(componentInstance.selectedPermission).toBe(null);
            });
    }));
     it('check onRevokePermission() method', async(() => {
        TestBed.compileComponents()
            .then(() => {
                let fixture = TestBed.createComponent(RoleListComponent);
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;

                componentInstance.selectedRole={"id": "5bfb1638-acf2-4899-88ef-817c471c0b26",
                       "name": "ASP" }
                componentInstance.onRevokePermission({
                    AppModuleName:'Test',
                    PermissionType:'R',
                    shortName:'TT'
                })
                expect(componentInstance.selectedPermission).toBe(null);
            });
    }));
});

var appModuleList=[
  {
    "id": "1325360c-8253-473a-a23f-55c269c34567",
    "menuText": "Area",
    "name": "Area",
    "shortName": "AR",
    "createdOn": "2017-05-19T05:40:58.1663531",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  },
  {
    "id": "1325360c-8253-473a-a23f-55c269c92345",
    "menuText": "Dashboard",
    "name": "Dashboard",
    "shortName": "DB",
    "createdOn": "2017-05-19T05:40:58.1663531",
    "createdBy": "56c385ae-ce46-41d4-b7fe-08df9aef9999",
    "updatedOn": null,
    "updatedBy": "00000000-0000-0000-0000-000000000000",
    "isDelete": false,
    "createdByName": null,
    "updatedByName": null
  }]

var roleList=[
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
  }]

 var rolePermissions=[
     'DB.R','DB.C','AR.R'
 ]