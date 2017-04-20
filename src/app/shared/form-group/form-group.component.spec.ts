import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsplFormGroupComponent } from './form-group.component';
import { SharedModule } from '../shared.module';

describe('Component: Form Group', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        EsplFormGroupTestController
      ],
      providers: [
        EsplFormGroupComponent
      ]
    });
    fixture = TestBed.createComponent(EsplFormGroupTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([EsplFormGroupComponent],
    (component: EsplFormGroupComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplFormGroupComponent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
    });
  })));

});

@Component({
  selector: 'test',
  template: `
    <espl-form-group
      qaid="test-1">
    </espl-form-group>
  `
})
class EsplFormGroupTestController { }

