import { TestBed } from '@angular/core/testing';

import { CheckAppointmentRepetitionConfigurationService } from './check-appointment-repetition-configuration.service';

describe('CheckAppointmentRepetitionConfigurationService', () => {
  let service: CheckAppointmentRepetitionConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAppointmentRepetitionConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
