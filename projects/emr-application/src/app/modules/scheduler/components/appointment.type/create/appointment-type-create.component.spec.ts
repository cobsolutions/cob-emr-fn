import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypeCreateComponent } from './appointment-type-create.component';

describe('AppointmentTypeCreateComponent', () => {
  let component: AppointmentTypeCreateComponent;
  let fixture: ComponentFixture<AppointmentTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
