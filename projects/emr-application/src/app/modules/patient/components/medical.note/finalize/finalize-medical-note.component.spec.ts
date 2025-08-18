import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeMedicalNoteComponent } from './finalize-medical-note.component';

describe('FinalizeMedicalNoteComponent', () => {
  let component: FinalizeMedicalNoteComponent;
  let fixture: ComponentFixture<FinalizeMedicalNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizeMedicalNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizeMedicalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
