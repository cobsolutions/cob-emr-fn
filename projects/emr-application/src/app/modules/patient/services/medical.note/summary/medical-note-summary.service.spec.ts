import { TestBed } from '@angular/core/testing';

import { MedicalNoteSummaryService } from './medical-note-summary.service';

describe('MedicalNoteSummaryService', () => {
  let service: MedicalNoteSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalNoteSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
