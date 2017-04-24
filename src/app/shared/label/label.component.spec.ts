import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsplLabelComponent } from './label.component';
import { SharedModule } from '../shared.module';

describe('Component: Label', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        EsplLabelComponentTestController
      ],
      providers: [
        EsplLabelComponent
      ]
    });
    fixture = TestBed.createComponent(EsplLabelComponentTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([EsplLabelComponent],
    (component: EsplLabelComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplLabelComponent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  })));

  it('should set the id to qaid value', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplLabelComponent));
      expect(query.nativeElement.querySelector('label')
        .getAttribute('id')).toBe('test-1');
    });
  })));
});

@Component({
  selector: 'test',
  template: `
    <espl-label
      qaid="test-1">
    </espl-label>
  `
})
class EsplLabelComponentTestController { }

