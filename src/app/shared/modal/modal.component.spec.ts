import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsplModalComponent } from './modal.component';
import { SharedModule } from '../shared.module';

describe('Component: Modal', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        EsplModalTestController
      ],
      providers: [
        EsplModalComponent
      ]
    });
    fixture = TestBed.createComponent(EsplModalTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([EsplModalComponent],
    (component: EsplModalComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplModalComponent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  })));
});

@Component({
  selector: 'test',
  template: `
    <espl-modal></espl-modal>
  `
})
class EsplModalTestController { }

