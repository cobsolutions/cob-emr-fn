import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCodeNumberComponent } from './billing-code-number.component';

describe('BillingCodeNumberComponent', () => {
  let component: BillingCodeNumberComponent;
  let fixture: ComponentFixture<BillingCodeNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingCodeNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingCodeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
