import { TestBed } from '@angular/core/testing';

import { SchedulerSetupResolverService } from './scheduler-setup-resolver.service';

describe('SchedulerSetupResolverService', () => {
  let service: SchedulerSetupResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulerSetupResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
