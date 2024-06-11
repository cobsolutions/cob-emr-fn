import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatAppointmentComponent } from './repeat-appointment.component';

describe('RepeatAppointmentComponent', () => {
  let component: RepeatAppointmentComponent;
  let fixture: ComponentFixture<RepeatAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
