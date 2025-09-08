import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialExaminationSummaryComponent } from './initial-examination-summary.component';

describe('InitialExaminationSummaryComponent', () => {
  let component: InitialExaminationSummaryComponent;
  let fixture: ComponentFixture<InitialExaminationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialExaminationSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialExaminationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
