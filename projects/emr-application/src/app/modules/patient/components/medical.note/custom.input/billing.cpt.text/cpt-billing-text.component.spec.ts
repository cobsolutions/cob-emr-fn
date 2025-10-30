import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CptBillingTextComponent } from './cpt-billing-text.component';

describe('CptBillingTextComponent', () => {
  let component: CptBillingTextComponent;
  let fixture: ComponentFixture<CptBillingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CptBillingTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CptBillingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
