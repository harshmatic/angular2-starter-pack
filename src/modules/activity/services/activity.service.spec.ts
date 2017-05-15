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

import { ActivityService } from './activity.service';
import { MessageService } from '../../../app/core/services/index';

class MessageServiceStub {
    addMessage(message : any) {
        return;
    }
}

////////  Tests  /////////////
describe('Service: ActivityService ', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,RouterTestingModule],
      providers: [
        ActivityService,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: MessageService, useClass: MessageServiceStub},
      ]
    })
      .compileComponents();
  }));
  it('can instantiate service when inject service',
     inject([ActivityService], (service: ActivityService) => {
         expect(service instanceof ActivityService).toBe(true);
  }));
  it('it should check getActivity method',
    inject([ActivityService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getActivity().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
  it('it should check getActivityByOB method',
    inject([ActivityService, XHRBackend], (service, mockBackend) => {
        let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
        mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.getActivityByOB().subscribe((res) => {
          expect(res.data.length).toBe(0);
        });
  }));
});

