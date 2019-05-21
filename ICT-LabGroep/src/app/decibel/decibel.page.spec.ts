import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecibelPage } from './decibel.page';

describe('DecibelPage', () => {
  let component: DecibelPage;
  let fixture: ComponentFixture<DecibelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecibelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecibelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
