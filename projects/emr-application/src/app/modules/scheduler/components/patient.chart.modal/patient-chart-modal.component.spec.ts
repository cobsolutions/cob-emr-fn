import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChartModalComponent } from './patient-chart-modal.component';

describe('PatientChartModalComponent', () => {
  let component: PatientChartModalComponent;
  let fixture: ComponentFixture<PatientChartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientChartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
