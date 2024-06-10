import { TestBed } from '@angular/core/testing';

import { InitializeAppointmentService } from './initialize-appointment.service';

describe('InitializeAppointmentService', () => {
  let service: InitializeAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitializeAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
