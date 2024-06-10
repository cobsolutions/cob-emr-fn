import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatusModalComponent } from './appointment-status-modal.component';

describe('AppointmentStatusModalComponent', () => {
  let component: AppointmentStatusModalComponent;
  let fixture: ComponentFixture<AppointmentStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentStatusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
