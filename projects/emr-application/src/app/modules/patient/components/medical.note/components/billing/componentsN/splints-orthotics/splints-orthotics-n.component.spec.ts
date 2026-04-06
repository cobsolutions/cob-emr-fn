import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplintsOrthoticsNComponent } from './splints-orthotics-n.component';

describe('SplintsOrthoticsNComponent', () => {
  let component: SplintsOrthoticsNComponent;
  let fixture: ComponentFixture<SplintsOrthoticsNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplintsOrthoticsNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplintsOrthoticsNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
