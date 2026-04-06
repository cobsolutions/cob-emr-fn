import { TestBed } from '@angular/core/testing';

import { StrengthMapperService } from './strength-mapper.service';

describe('StrengthMapperService', () => {
  let service: StrengthMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrengthMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
