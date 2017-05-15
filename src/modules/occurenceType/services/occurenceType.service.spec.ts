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

import { OccurenceTypeService } from './occurenceType.service';
import { MessageService } from '../../../app/core/services/index';

class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}

////////  Tests  /////////////
describe('Service: OccurenceTypeService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        OccurenceTypeService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([OccurenceTypeService], (service: OccurenceTypeService) => {
         expect(service instanceof OccurenceTypeService).toBe(true);
  }));


  it('it should check getOts method',
    inject([OccurenceTypeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getOts().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check addOt method',
    inject([OccurenceTypeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addOt().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check saveOt method',
    inject([OccurenceTypeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.saveOt().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check deleteOt method',
    inject([OccurenceTypeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteOt().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check getOt method',
    inject([OccurenceTypeService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getOt().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

