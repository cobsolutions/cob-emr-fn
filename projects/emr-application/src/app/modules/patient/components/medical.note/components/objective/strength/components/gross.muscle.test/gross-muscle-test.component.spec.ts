import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossMuscleTestComponent } from './gross-muscle-test.component';

describe('GrossMuscleTestComponent', () => {
  let component: GrossMuscleTestComponent;
  let fixture: ComponentFixture<GrossMuscleTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrossMuscleTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrossMuscleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
