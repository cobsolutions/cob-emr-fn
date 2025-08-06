import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsuranceCompanyComponent } from './list-insurance-company.component';

describe('ListInsuranceCompanyComponent', () => {
  let component: ListInsuranceCompanyComponent;
  let fixture: ComponentFixture<ListInsuranceCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInsuranceCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInsuranceCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
