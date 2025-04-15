import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTestsRightLeftCheckComponent } from './special-tests-right-left-check.component';

describe('SpecialTestsRightLeftCheckComponent', () => {
  let component: SpecialTestsRightLeftCheckComponent;
  let fixture: ComponentFixture<SpecialTestsRightLeftCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialTestsRightLeftCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialTestsRightLeftCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
