import { TestBed } from '@angular/core/testing';

import { PriorFunctionMapperService } from './prior-function-mapper.service';

describe('PriorFunctionMapperService', () => {
  let service: PriorFunctionMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriorFunctionMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
