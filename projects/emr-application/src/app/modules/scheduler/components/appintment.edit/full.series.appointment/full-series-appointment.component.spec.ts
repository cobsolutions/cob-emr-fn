import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSeriesAppointmentComponent } from './full-series-appointment.component';

describe('FullSeriesAppointmentComponent', () => {
  let component: FullSeriesAppointmentComponent;
  let fixture: ComponentFixture<FullSeriesAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullSeriesAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullSeriesAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
