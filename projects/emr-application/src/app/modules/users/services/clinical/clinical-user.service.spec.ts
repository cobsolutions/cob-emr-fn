import { TestBed } from '@angular/core/testing';

import { ClinicalUserService } from './clinical-user.service';

describe('ClinicalUserService', () => {
  let service: ClinicalUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
