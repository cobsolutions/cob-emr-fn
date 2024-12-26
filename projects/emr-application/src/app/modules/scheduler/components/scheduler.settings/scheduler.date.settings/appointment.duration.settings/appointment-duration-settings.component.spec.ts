import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDurationSettingsComponent } from './appointment-duration-settings.component';

describe('AppointmentDurationSettingsComponent', () => {
  let component: AppointmentDurationSettingsComponent;
  let fixture: ComponentFixture<AppointmentDurationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDurationSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDurationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
