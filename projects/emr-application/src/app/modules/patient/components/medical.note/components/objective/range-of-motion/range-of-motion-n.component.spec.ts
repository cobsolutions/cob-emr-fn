import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeOfMotionNComponent } from './range-of-motion-n.component';

describe('RangeOfMotionNComponent', () => {
  let component: RangeOfMotionNComponent;
  let fixture: ComponentFixture<RangeOfMotionNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeOfMotionNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeOfMotionNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
