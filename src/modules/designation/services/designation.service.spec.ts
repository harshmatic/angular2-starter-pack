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

import { DesignationService } from './designation.service';
import { MessageService } from '../../../app/core/services/index';

class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}

////////  Tests  /////////////
describe('Service: DesignationService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        DesignationService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([DesignationService], (service: DesignationService) => {
         expect(service instanceof DesignationService).toBe(true);
  }));
  it('it should check getDesignations method',
    inject([DesignationService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getDesignations().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check addDesignation method',
    inject([DesignationService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addDesignation().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check saveDesignation method',
    inject([DesignationService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.saveDesignation().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check deleteDesignation method',
    inject([DesignationService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteDesignation().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getDesignation method',
    inject([DesignationService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getDesignation().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

