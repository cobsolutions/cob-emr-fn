import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleColumnsCheckboxComponent } from './multiple-columns-checkbox.component';

describe('MultipleColumnsCheckboxComponent', () => {
  let component: MultipleColumnsCheckboxComponent;
  let fixture: ComponentFixture<MultipleColumnsCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleColumnsCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleColumnsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
