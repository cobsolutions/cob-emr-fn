import { TestBed } from '@angular/core/testing';

import { AppointmentActionsService } from './appointment-actions.service';

describe('AppointmentActionsService', () => {
  let service: AppointmentActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
