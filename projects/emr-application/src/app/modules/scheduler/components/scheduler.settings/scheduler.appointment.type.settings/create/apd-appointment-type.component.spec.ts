import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApdAppointmentTypeComponent } from './apd-appointment-type.component';

describe('ApdAppointmentTypeComponent', () => {
  let component: ApdAppointmentTypeComponent;
  let fixture: ComponentFixture<ApdAppointmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApdAppointmentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApdAppointmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
