import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import { SharedModule } from '../shared.module';
import { EsplFormComponent } from './form.component';

describe('Component: Form', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ReactiveFormsModule
      ],
      declarations: [
        EsplFormComponentTestController
      ],
      providers: [
        EsplFormComponent
      ]
    });
    fixture = TestBed.createComponent(EsplFormComponentTestController);
    fixture.detectChanges();
  });

  it('should inject the component', inject([EsplFormComponent],
    (component: EsplFormComponent) => {
      expect(component).toBeTruthy();
    }));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplFormComponent));
      expect(query).toBeTruthy();
      expect(query.componentInstance).toBeTruthy();
      expect(query.componentInstance.onSubmit).toBeTruthy();
      expect(query.componentInstance.group).toBeTruthy();
    });
  })));

  it('should emit event when onSubmit is invoked', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.autoDetectChanges();
      let query = fixture.debugElement
        .query(By.directive(EsplFormComponent));
      query.componentInstance.onSubmit.subscribe(c => {
        expect(c).toBeDefined();
      });
      query.nativeElement.querySelector('button').click();
    });
  })));

});

@Component({
  selector: 'test',
  template: `
    <espl-form
      [group]="group">
      <input
        [formControl]="field1">
      <button type="submit">submit</button>
    </espl-form>
  `
})
class EsplFormComponentTestController {
  private group: FormGroup;
  private field1: FormControl;
  constructor(private builder: FormBuilder) {
    this.field1 = new FormControl('test value');
    this.group = this.builder.group({
      field1: this.field1,
    });
  }
}
