import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerAppointmentSettingsComponent } from './scheduler.appointment.settings.component';

describe('SchedulerAppointmentSettingsComponent', () => {
  let component: SchedulerAppointmentSettingsComponent;
  let fixture: ComponentFixture<SchedulerAppointmentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerAppointmentSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulerAppointmentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
