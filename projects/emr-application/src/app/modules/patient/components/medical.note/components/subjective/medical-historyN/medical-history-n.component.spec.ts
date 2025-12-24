import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryNComponent } from './medical-history-n.component';

describe('MedicalHistoryNComponent', () => {
  let component: MedicalHistoryNComponent;
  let fixture: ComponentFixture<MedicalHistoryNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
