import { TestBed } from '@angular/core/testing';

import { OmtMapperService } from './omt-mapper.service';

describe('OmtMapperService', () => {
  let service: OmtMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmtMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
