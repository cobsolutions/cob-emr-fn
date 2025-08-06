import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRadioComponent } from './multiple-radio.component';

describe('MultipleRadioComponent', () => {
  let component: MultipleRadioComponent;
  let fixture: ComponentFixture<MultipleRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
