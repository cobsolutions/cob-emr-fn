import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UntimedCodesComponent } from './untimed-codes.component';

describe('UntimedCodesComponent', () => {
  let component: UntimedCodesComponent;
  let fixture: ComponentFixture<UntimedCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UntimedCodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UntimedCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
