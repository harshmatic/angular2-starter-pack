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

import { AreaService } from './area.service';
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
describe('Service: AreaService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        AreaService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
        { provide: EtagService, useClass: EtagServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([AreaService], (service: AreaService) => {
         expect(service instanceof AreaService).toBe(true);
  }));
  it('it should check getAreas method',
    inject([AreaService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getAreas().subscribe((res) => {
          expect(res.length).toBe(0);
        });
  }));
  it('it should check addArea method',
    inject([AreaService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addArea().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check saveArea method',
    inject([AreaService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.saveArea().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check deleteArea method',
    inject([AreaService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteArea().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getArea method',
    inject([AreaService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getArea().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

