import { Component,Directive,NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../../core/core.module';
import { EsplLoginFormComponent } from './login-form.component';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../../../../app/core/services/index';

@Component({
    selector: 'test-cmp',
    template: '<app-espl-login-form></app-espl-login-form>'
})
class TestComponent { }

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
}
class MessageServiceStub {
    addMessage(message:any) {
        return;
    }
}
class AuthServiceStub {
    getConferenceRooms() {
        return;
    }
}
describe('Component: Login Form', () => {
  let fixture,comp
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        FormsModule, ReactiveFormsModule
      ],
       schemas: [NO_ERRORS_SCHEMA],
        declarations: [EsplLoginFormComponent, TestComponent, RouterLinkStubDirective],
        providers: [
                    { provide: AuthService, useClass: AuthServiceStub },
                    { provide: MessageService, useClass: MessageServiceStub },
                ]
    });
     fixture = TestBed.createComponent(TestComponent);
     
     comp = fixture.componentInstance;
  });

  it('should inject the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
      let element = fixture.nativeElement;
      expect(element.querySelector('.loginFooter').innerText).toEqual('Copyrights © 2017. All rights reserved.');
    });
  })));
});