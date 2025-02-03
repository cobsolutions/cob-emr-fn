import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSeriesAppointmentModalComponent } from './editable-series-appointment-modal.component';

describe('EditableSeriesAppointmentModalComponent', () => {
  let component: EditableSeriesAppointmentModalComponent;
  let fixture: ComponentFixture<EditableSeriesAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableSeriesAppointmentModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableSeriesAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
