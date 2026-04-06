import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesNComponent } from './specialties-n.component';

describe('SpecialtiesNComponent', () => {
  let component: SpecialtiesNComponent;
  let fixture: ComponentFixture<SpecialtiesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialtiesNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtiesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
