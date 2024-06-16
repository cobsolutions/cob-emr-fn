import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClinicalUserComponent } from './list-clinical-user.component';

describe('ListClinicalUserComponent', () => {
  let component: ListClinicalUserComponent;
  let fixture: ComponentFixture<ListClinicalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClinicalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClinicalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
