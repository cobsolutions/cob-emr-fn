import { TestBed } from '@angular/core/testing';

import { PatientChartCheckerService } from './patient-chart-checker.service';

describe('PatientChartCheckerService', () => {
  let service: PatientChartCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientChartCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
