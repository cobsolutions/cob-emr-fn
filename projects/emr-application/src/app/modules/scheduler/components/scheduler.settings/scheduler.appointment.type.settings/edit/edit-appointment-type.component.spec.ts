import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentTypeComponent } from './edit-appointment-type.component';

describe('EditAppointmentTypeComponent', () => {
  let component: EditAppointmentTypeComponent;
  let fixture: ComponentFixture<EditAppointmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAppointmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
