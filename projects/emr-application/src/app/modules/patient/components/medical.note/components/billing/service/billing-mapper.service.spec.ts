import { TestBed } from '@angular/core/testing';

import { BillingMapperService } from './billing-mapper.service';

describe('BillingMapperService', () => {
  let service: BillingMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
