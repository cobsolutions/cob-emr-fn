import { TestBed } from '@angular/core/testing';

import { HandleDragableAppointmentService } from './handle-dragable-appointment.service';

describe('HandleDragableAppointmentService', () => {
  let service: HandleDragableAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleDragableAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
