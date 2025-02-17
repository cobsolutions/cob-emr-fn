import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelationFeeComponent } from './cancelation-fee.component';

describe('CancelationFeeComponent', () => {
  let component: CancelationFeeComponent;
  let fixture: ComponentFixture<CancelationFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelationFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelationFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
