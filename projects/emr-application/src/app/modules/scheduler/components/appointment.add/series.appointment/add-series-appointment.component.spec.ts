import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeriesAppointmentComponent } from './add-series-appointment.component';

describe('AddSeriesAppointmentComponent', () => {
  let component: AddSeriesAppointmentComponent;
  let fixture: ComponentFixture<AddSeriesAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeriesAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSeriesAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
