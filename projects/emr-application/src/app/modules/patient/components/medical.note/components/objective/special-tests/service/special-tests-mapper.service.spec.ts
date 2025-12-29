import { TestBed } from '@angular/core/testing';

import { SpecialTestsMapperService } from './special-tests-mapper.service';

describe('SpecialTestsMapperService', () => {
  let service: SpecialTestsMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialTestsMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
