import { TestBed } from '@angular/core/testing';

import { OmtTestService } from './omt-test.service';

describe('OmtTestService', () => {
  let service: OmtTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmtTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
