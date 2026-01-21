import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNoteNComponent } from './daily-note-n.component';

describe('DailyNoteNComponent', () => {
  let component: DailyNoteNComponent;
  let fixture: ComponentFixture<DailyNoteNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyNoteNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyNoteNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
