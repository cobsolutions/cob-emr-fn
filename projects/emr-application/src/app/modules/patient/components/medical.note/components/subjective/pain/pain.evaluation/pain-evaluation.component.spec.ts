import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainEvaluationComponent } from './pain-evaluation.component';

describe('PainEvaluationComponent', () => {
  let component: PainEvaluationComponent;
  let fixture: ComponentFixture<PainEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
