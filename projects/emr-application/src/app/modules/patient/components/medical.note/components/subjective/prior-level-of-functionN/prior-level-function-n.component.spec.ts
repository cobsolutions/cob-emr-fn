import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorLevelFunctionNComponent } from './prior-level-function-n.component';

describe('PriorLevelFunctionNComponent', () => {
  let component: PriorLevelFunctionNComponent;
  let fixture: ComponentFixture<PriorLevelFunctionNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorLevelFunctionNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorLevelFunctionNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
