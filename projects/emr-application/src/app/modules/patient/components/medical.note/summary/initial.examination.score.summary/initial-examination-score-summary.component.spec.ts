import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialExaminationScoreSummaryComponent } from './initial-examination-score-summary.component';

describe('InitialExaminationScoreSummaryComponent', () => {
  let component: InitialExaminationScoreSummaryComponent;
  let fixture: ComponentFixture<InitialExaminationScoreSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialExaminationScoreSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialExaminationScoreSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
