import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDischargeNoteComponent } from './full-discharge-note.component';

describe('FullDischargeNoteComponent', () => {
  let component: FullDischargeNoteComponent;
  let fixture: ComponentFixture<FullDischargeNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullDischargeNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullDischargeNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
