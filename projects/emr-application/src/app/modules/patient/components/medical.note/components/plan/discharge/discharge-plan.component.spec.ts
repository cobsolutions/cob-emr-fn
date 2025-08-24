import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargePlanComponent } from './discharge-plan.component';

describe('DischargePlanComponent', () => {
  let component: DischargePlanComponent;
  let fixture: ComponentFixture<DischargePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DischargePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
