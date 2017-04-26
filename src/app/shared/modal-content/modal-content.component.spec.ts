import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsplModalContentComponent } from './modal-content.component';
import { SharedModule } from '../shared.module';

describe('Component: Modal Content', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        EsplModalContentComponentTestController
      ],
      providers: [
        EsplModalContentComponent
      ]
    });
    fixture = TestBed.createComponent(EsplModalContentComponentTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([EsplModalContentComponent],
    (component: EsplModalContentComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplModalContentComponent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  }));
});

@Component({
  selector: 'test',
  template: `
    <espl-modal-content></espl-modal-content>
  `
})
class EsplModalContentComponentTestController { }

