import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemmesWeinsteinUpperComponent } from './semmes-weinstein-upper.component';

describe('SemmesWeinsteinUpperComponent', () => {
  let component: SemmesWeinsteinUpperComponent;
  let fixture: ComponentFixture<SemmesWeinsteinUpperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemmesWeinsteinUpperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemmesWeinsteinUpperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
