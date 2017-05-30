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

import { StatusService } from './status.service';
import { MessageService,EtagService } from '../../../app/core/services/index';

class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}
class EtagServiceStub {
    getListWithEtag(url:string) { 
      return new Observable<any>((observer:any) => {
           observer.next([]);
      });
    }
}
////////  Tests  /////////////
describe('Service: StatusService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        StatusService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub}, 
        { provide: EtagService, useClass: EtagServiceStub}
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([StatusService], (service: StatusService) => {
         expect(service instanceof StatusService).toBe(true);
  }));


  // it('it should check getStatusAll method',
  //   inject([StatusService, XHRBackend], (service, mockBackend) => {
  //       let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
  //       mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
  //       service.getStatusAll().subscribe((res) => {
  //         expect(res.length).toBe(0);
  //       });
  // }));
   it('it should check addStatus method',
    inject([StatusService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addStatus().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check saveStatus method',
    inject([StatusService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.saveStatus().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check deleteStatus method',
    inject([StatusService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteStatus().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check getStatus method',
    inject([StatusService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getStatus().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

