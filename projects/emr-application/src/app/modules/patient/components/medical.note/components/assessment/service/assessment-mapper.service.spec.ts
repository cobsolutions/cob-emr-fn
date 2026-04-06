import { TestBed } from '@angular/core/testing';

import { AssessmentMapperService } from './assessment-mapper.service';

describe('AssessmentMapperService', () => {
  let service: AssessmentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
