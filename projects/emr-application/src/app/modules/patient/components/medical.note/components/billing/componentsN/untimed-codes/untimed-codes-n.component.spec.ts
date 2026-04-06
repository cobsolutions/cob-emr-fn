import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UntimedCodesNComponent } from './untimed-codes-n.component';

describe('UntimedCodesNComponent', () => {
  let component: UntimedCodesNComponent;
  let fixture: ComponentFixture<UntimedCodesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UntimedCodesNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UntimedCodesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
