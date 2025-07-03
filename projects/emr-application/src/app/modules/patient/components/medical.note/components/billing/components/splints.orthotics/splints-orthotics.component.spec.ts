import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplintsOrthoticsComponent } from './splints-orthotics.component';

describe('SplintsOrthoticsComponent', () => {
  let component: SplintsOrthoticsComponent;
  let fixture: ComponentFixture<SplintsOrthoticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplintsOrthoticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplintsOrthoticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
