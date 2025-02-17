import { TestBed } from '@angular/core/testing';

import { PatientPaymentService } from './patient-payment.service';

describe('PatientPaymentService', () => {
  let service: PatientPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
