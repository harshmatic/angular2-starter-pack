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

import { OccurenceBookService } from './occurenceBook.service';
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
describe('Service: OccurenceBookService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        OccurenceBookService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub}, 
        { provide: EtagService, useClass: EtagServiceStub}
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([OccurenceBookService], (service: OccurenceBookService) => {
         expect(service instanceof OccurenceBookService).toBe(true);
  }));


  it('it should check getObs method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.getObs().subscribe((res) => {
          expect(res.length).toBe(0);
        });
  }));
   it('it should check getObsOff method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.getObsOff().subscribe((res) => {
          expect(res.length).toBe(0);
        });
  }));
   it('it should check addOb method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.addOb().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check saveOb method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.saveOb().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check deleteOb method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.deleteOb().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check getOb method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.getOb().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check updateStatusHistory method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.updateStatusHistory().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check addReview method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.addReview({OBID:1}).subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check addJob method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.addJob().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
   it('it should check updateOfficer method',
    inject([OccurenceBookService, XHRBackend], (occurenceBookService, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        occurenceBookService.updateOfficer({obid:1}).subscribe((res) => {
          expect(res.length).toBe(0);
        });
  }));
});

