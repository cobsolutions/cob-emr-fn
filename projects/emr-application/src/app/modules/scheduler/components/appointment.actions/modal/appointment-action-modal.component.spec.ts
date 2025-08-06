import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentActionModalComponent } from './appointment-action-modal.component';

describe('AppointmentActionModalComponent', () => {
  let component: AppointmentActionModalComponent;
  let fixture: ComponentFixture<AppointmentActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentActionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
