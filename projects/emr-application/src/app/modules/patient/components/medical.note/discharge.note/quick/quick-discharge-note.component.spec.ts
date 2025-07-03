import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickDischargeNoteComponent } from './quick-discharge-note.component';

describe('QuickDischargeNoteComponent', () => {
  let component: QuickDischargeNoteComponent;
  let fixture: ComponentFixture<QuickDischargeNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickDischargeNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickDischargeNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
