import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickDischargeNComponent } from './quick-discharge-n.component';

describe('QuickDischargeNComponent', () => {
  let component: QuickDischargeNComponent;
  let fixture: ComponentFixture<QuickDischargeNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickDischargeNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickDischargeNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
