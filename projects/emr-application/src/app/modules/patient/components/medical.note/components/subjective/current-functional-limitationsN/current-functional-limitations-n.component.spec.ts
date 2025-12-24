import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFunctionalLimitationsNComponent } from './current-functional-limitations-n.component';

describe('CurrentFunctionalLimitationsNComponent', () => {
  let component: CurrentFunctionalLimitationsNComponent;
  let fixture: ComponentFixture<CurrentFunctionalLimitationsNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentFunctionalLimitationsNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentFunctionalLimitationsNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
