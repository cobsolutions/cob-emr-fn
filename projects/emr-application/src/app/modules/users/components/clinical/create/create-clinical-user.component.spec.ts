import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClinicalUserComponent } from './create-clinical-user.component';

describe('CreateClinicalUserComponent', () => {
  let component: CreateClinicalUserComponent;
  let fixture: ComponentFixture<CreateClinicalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClinicalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClinicalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
