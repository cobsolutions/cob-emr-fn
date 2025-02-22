import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDependencyFieldComponent } from './multiple-dependency-field.component';

describe('MultipleDependencyFieldComponent', () => {
  let component: MultipleDependencyFieldComponent;
  let fixture: ComponentFixture<MultipleDependencyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleDependencyFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleDependencyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
