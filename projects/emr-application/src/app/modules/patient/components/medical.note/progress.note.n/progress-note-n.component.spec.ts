import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressNoteNComponent } from './progress-note-n.component';

describe('ProgressNoteNComponent', () => {
  let component: ProgressNoteNComponent;
  let fixture: ComponentFixture<ProgressNoteNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressNoteNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressNoteNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
