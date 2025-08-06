import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTypeListComponent } from './appointment-type-list.component';

describe('AppointmentTypeListComponent', () => {
  let component: AppointmentTypeListComponent;
  let fixture: ComponentFixture<AppointmentTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
