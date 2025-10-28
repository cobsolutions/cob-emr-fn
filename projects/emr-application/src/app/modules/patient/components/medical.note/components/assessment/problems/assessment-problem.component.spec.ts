import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProblemComponent } from './assessment-problem.component';

describe('AssessmentProblemComponent', () => {
  let component: AssessmentProblemComponent;
  let fixture: ComponentFixture<AssessmentProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentProblemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
