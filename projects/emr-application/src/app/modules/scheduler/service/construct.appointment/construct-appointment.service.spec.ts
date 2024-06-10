import { TestBed } from '@angular/core/testing';

import { ConstructAppointmentService } from './construct-appointment.service';

describe('ConstructAppointmentService', () => {
  let service: ConstructAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
