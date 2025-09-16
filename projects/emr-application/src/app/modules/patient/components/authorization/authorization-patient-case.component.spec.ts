import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationPatientCaseComponent } from './authorization-patient-case.component';

describe('AuthorizationPatientCaseComponent', () => {
  let component: AuthorizationPatientCaseComponent;
  let fixture: ComponentFixture<AuthorizationPatientCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationPatientCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationPatientCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
