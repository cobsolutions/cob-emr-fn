import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTestsNComponent } from './special-tests-n.component';

describe('SpecialTestsNComponent', () => {
  let component: SpecialTestsNComponent;
  let fixture: ComponentFixture<SpecialTestsNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialTestsNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialTestsNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
