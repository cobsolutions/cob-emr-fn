import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTestsRightLeftSelectComponent } from './special-tests-right-left-select.component';

describe('SpecialTestsRightLeftSelectComponent', () => {
  let component: SpecialTestsRightLeftSelectComponent;
  let fixture: ComponentFixture<SpecialTestsRightLeftSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialTestsRightLeftSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialTestsRightLeftSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
