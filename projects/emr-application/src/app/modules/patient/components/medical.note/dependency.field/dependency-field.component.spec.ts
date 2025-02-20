import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyFieldComponent } from './dependency-field.component';

describe('DependencyFieldComponent', () => {
  let component: DependencyFieldComponent;
  let fixture: ComponentFixture<DependencyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependencyFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependencyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
