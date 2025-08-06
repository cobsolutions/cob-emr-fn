import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAppointmentComponent } from './full-appointment.component';

describe('FullAppointmentComponent', () => {
  let component: FullAppointmentComponent;
  let fixture: ComponentFixture<FullAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
