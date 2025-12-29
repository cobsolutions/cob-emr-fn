import { TestBed } from '@angular/core/testing';

import { PlanOfCareMapperService } from './plan-of-care-mapper.service';

describe('PlanOfCareMapperService', () => {
  let service: PlanOfCareMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanOfCareMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
