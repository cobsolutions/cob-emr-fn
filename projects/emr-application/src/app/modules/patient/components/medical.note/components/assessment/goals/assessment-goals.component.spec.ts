import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentGoalsComponent } from './assessment-goals.component';

describe('AssessmentGoalsComponent', () => {
  let component: AssessmentGoalsComponent;
  let fixture: ComponentFixture<AssessmentGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentGoalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
