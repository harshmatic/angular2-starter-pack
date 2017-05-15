import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { DepartmentService } from './department.service';
import { MessageService } from '../../../app/core/services/index';

class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}

////////  Tests  /////////////
describe('Service: DepartmentService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        DepartmentService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([DepartmentService], (service: DepartmentService) => {
         expect(service instanceof DepartmentService).toBe(true);
  }));
  it('it should check getDepartments method',
    inject([DepartmentService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getDepartments().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check addDepartment method',
    inject([DepartmentService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addDepartment().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check saveDepartment method',
    inject([DepartmentService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.saveDepartment().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check deleteDepartment method',
    inject([DepartmentService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteDepartment().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getDepartment method',
    inject([DepartmentService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getDepartment().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

