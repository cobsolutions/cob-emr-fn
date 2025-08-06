import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClinicsComponent } from './list-clinics.component';

describe('ListClinicsComponent', () => {
  let component: ListClinicsComponent;
  let fixture: ComponentFixture<ListClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClinicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
