import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropmtPatientClinicsComponent } from './propmt-patient-clinics.component';

describe('PropmtPatientClinicsComponent', () => {
  let component: PropmtPatientClinicsComponent;
  let fixture: ComponentFixture<PropmtPatientClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropmtPatientClinicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropmtPatientClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
