import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAvatarComponent } from './patient-avatar.component';

describe('PatientAvatarComponent', () => {
  let component: PatientAvatarComponent;
  let fixture: ComponentFixture<PatientAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
