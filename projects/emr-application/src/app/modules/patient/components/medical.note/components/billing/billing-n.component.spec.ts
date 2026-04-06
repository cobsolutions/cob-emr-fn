import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingNComponent } from './billing-n.component';

describe('BillingNComponent', () => {
  let component: BillingNComponent;
  let fixture: ComponentFixture<BillingNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
