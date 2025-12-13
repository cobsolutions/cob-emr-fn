import { TestBed } from '@angular/core/testing';

import { PatientChartNoteService } from './patient-chart-note.service';

describe('PatientChartNoteService', () => {
  let service: PatientChartNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientChartNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
