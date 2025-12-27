import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTreatmentProceduresNComponent } from './other-treatment-procedures-n.component';

describe('OtherTreatmentProceduresNComponent', () => {
  let component: OtherTreatmentProceduresNComponent;
  let fixture: ComponentFixture<OtherTreatmentProceduresNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherTreatmentProceduresNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTreatmentProceduresNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
