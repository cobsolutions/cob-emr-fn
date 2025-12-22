import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialHandlingWorkConditionComponent } from './material-handling-work-condition.component';

describe('MaterialHandlingWorkConditionComponent', () => {
  let component: MaterialHandlingWorkConditionComponent;
  let fixture: ComponentFixture<MaterialHandlingWorkConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialHandlingWorkConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialHandlingWorkConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
