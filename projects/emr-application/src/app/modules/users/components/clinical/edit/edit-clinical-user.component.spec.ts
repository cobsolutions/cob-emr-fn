import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClinicalUserComponent } from './edit-clinical-user.component';

describe('EditClinicalUserComponent', () => {
  let component: EditClinicalUserComponent;
  let fixture: ComponentFixture<EditClinicalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClinicalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClinicalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
