import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypeCreateModalComponent } from './appointment-type-create-modal.component';

describe('AppointmentTypeCreateModalComponent', () => {
  let component: AppointmentTypeCreateModalComponent;
  let fixture: ComponentFixture<AppointmentTypeCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTypeCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypeCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
