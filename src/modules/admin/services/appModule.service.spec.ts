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

import { AppModuleService } from './appModule.service';
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
describe('Service: AppModuleService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        AppModuleService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
        { provide: EtagService, useClass: EtagServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([AppModuleService], (service: AppModuleService) => {
         expect(service instanceof AppModuleService).toBe(true);
  }));
  it('it should check getModules method',
    inject([AppModuleService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getModules().subscribe((res) => {
          expect(res.length).toBe(0);
        });
  }));
  it('it should check addModules method',
    inject([AppModuleService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.addModules().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check deleteModules method',
    inject([AppModuleService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.deleteModules().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

