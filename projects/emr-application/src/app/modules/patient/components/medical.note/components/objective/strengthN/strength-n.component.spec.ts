import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthNComponent } from './strength-n.component';

describe('StrengthNComponent', () => {
  let component: StrengthNComponent;
  let fixture: ComponentFixture<StrengthNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrengthNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
