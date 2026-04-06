import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthNComponent } from './calendar-month-n.component';

describe('CalendarMonthNComponent', () => {
  let component: CalendarMonthNComponent;
  let fixture: ComponentFixture<CalendarMonthNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMonthNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarMonthNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
