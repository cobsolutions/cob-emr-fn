import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationConfirmationComponent } from './organization-confirmation.component';

describe('OrganizationConfirmationComponent', () => {
  let component: OrganizationConfirmationComponent;
  let fixture: ComponentFixture<OrganizationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
