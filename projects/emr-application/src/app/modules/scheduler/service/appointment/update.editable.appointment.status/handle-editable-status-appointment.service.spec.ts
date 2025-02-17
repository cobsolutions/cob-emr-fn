import { TestBed } from '@angular/core/testing';

import { HandleEditableStatusAppointmentService } from './handle-editable-status-appointment.service';

describe('HandlEditableStatusAppointmentService', () => {
  let service: HandleEditableStatusAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleEditableStatusAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
