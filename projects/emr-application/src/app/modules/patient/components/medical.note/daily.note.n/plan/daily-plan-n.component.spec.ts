import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPlanNComponent } from './daily-plan-n.component';

describe('DailyPlanNComponent', () => {
  let component: DailyPlanNComponent;
  let fixture: ComponentFixture<DailyPlanNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyPlanNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPlanNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
