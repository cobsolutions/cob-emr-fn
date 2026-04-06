import { TestBed } from '@angular/core/testing';

import { PalpationMapperService } from './palpation-mapper.service';

describe('PalpationMapperService', () => {
  let service: PalpationMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalpationMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
