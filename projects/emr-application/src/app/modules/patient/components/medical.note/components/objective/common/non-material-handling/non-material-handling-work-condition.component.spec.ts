import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMaterialHandlingWorkConditionComponent } from './non-material-handling-work-condition.component';

describe('NonMaterialHandlingWorkConditionComponent', () => {
  let component: NonMaterialHandlingWorkConditionComponent;
  let fixture: ComponentFixture<NonMaterialHandlingWorkConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMaterialHandlingWorkConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonMaterialHandlingWorkConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
