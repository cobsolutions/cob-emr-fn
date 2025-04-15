import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTreatmentProceduresComponent } from './other-treatment-procedures.component';

describe('OtherTreatmentProceduresComponent', () => {
  let component: OtherTreatmentProceduresComponent;
  let fixture: ComponentFixture<OtherTreatmentProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherTreatmentProceduresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTreatmentProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
