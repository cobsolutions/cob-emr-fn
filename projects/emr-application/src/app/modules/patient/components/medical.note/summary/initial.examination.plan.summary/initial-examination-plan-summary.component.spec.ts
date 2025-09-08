import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialExaminationPlanSummaryComponent } from './initial-examination-plan-summary.component';

describe('InitialExaminationPlanSummaryComponent', () => {
  let component: InitialExaminationPlanSummaryComponent;
  let fixture: ComponentFixture<InitialExaminationPlanSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialExaminationPlanSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialExaminationPlanSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
