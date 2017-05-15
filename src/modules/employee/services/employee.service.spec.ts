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

import { EmployeeService } from './employee.service';
import { MessageService } from '../../../app/core/services/index';

class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}

////////  Tests  /////////////
describe('Service: EmployeeService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        EmployeeService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([EmployeeService], (service: EmployeeService) => {
         expect(service instanceof EmployeeService).toBe(true);
  }));
  it('it should check getEmployees method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getEmployees().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getEmployeesByPage method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getEmployeesByPage().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check addEmployee method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addEmployee().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getEmployeesByDept method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getEmployeesByDept({departmentID:1,areaID:'area',rankID:'123'}).subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check saveEmployee method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.saveEmployee().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check deleteEmployee method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteEmployee().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getEmployee method',
    inject([EmployeeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getEmployee().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

