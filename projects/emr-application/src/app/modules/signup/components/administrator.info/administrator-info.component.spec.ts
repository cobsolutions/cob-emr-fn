import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorInfoComponent } from './administrator-info.component';

describe('AdministratorInfoComponent', () => {
  let component: AdministratorInfoComponent;
  let fixture: ComponentFixture<AdministratorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministratorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
