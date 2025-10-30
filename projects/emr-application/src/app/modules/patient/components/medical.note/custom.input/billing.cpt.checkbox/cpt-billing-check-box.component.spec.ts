import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CptBillingCheckBoxComponent } from './cpt-billing-check-box.component';

describe('CptBillingCheckBoxComponent', () => {
  let component: CptBillingCheckBoxComponent;
  let fixture: ComponentFixture<CptBillingCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CptBillingCheckBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CptBillingCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
