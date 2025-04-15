import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonMaterialHandlingComponent } from './non-material-handling.component';

describe('NonMaterialHandlingComponent', () => {
  let component: NonMaterialHandlingComponent;
  let fixture: ComponentFixture<NonMaterialHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonMaterialHandlingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonMaterialHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
