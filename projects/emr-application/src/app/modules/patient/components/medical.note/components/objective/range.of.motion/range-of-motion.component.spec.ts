import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeOfMotionComponent } from './range-of-motion.component';

describe('RangeOfMotionComponent', () => {
  let component: RangeOfMotionComponent;
  let fixture: ComponentFixture<RangeOfMotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeOfMotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeOfMotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
