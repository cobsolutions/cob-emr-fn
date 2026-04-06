import { TestBed } from '@angular/core/testing';

import { MedicalHistoryMapperService } from './medical-history-mapper.service';

describe('MedicalHistoryMapperService', () => {
  let service: MedicalHistoryMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalHistoryMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
