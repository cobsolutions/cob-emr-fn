import { TestBed } from '@angular/core/testing';

import { CurrentFunctionMapperService } from './current.function.mapper.service';

describe('CurrentFunctionMapperService', () => {
  let service: CurrentFunctionMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentFunctionMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
