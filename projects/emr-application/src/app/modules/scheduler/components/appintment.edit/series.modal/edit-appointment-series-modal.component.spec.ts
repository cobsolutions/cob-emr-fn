import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentSeriesModalComponent } from './edit-appointment-series-modal.component';

describe('EditAppointmentSeriesModalComponent', () => {
  let component: EditAppointmentSeriesModalComponent;
  let fixture: ComponentFixture<EditAppointmentSeriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentSeriesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAppointmentSeriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
