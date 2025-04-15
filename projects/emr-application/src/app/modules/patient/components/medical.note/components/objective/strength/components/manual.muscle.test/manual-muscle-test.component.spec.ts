import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualMuscleTestComponent } from './manual-muscle-test.component';

describe('ManualMuscleTestComponent', () => {
  let component: ManualMuscleTestComponent;
  let fixture: ComponentFixture<ManualMuscleTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualMuscleTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualMuscleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
