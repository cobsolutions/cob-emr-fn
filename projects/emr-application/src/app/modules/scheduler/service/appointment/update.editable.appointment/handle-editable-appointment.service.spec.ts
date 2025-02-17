import { TestBed } from '@angular/core/testing';

import { HandleEditableAppointmentService } from './handle-editable-appointment.service';

describe('HandleEditableAppointmentService', () => {
  let service: HandleEditableAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleEditableAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
