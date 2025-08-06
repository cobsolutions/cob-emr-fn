import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCancelNoshowModalComponent } from './appointment-cancel-noshow-modal.component';

describe('AppointmentCancelNoshowModalComponent', () => {
  let component: AppointmentCancelNoshowModalComponent;
  let fixture: ComponentFixture<AppointmentCancelNoshowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCancelNoshowModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCancelNoshowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
