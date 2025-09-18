import { TestBed } from '@angular/core/testing';

import { PatientCaseAuthorizationService } from './patient-case-authorization.service';

describe('PatientCaseAuthorizationService', () => {
  let service: PatientCaseAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCaseAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
