import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentTypeComponent } from './list-appointment-type.component';

describe('ListAppointmentTypeComponent', () => {
  let component: ListAppointmentTypeComponent;
  let fixture: ComponentFixture<ListAppointmentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAppointmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
