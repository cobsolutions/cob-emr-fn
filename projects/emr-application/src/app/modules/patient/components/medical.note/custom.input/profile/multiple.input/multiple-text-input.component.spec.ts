import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTextInputComponent } from './multiple-text-input.component';

describe('MultipleTextInputComponent', () => {
  let component: MultipleTextInputComponent;
  let fixture: ComponentFixture<MultipleTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleTextInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
