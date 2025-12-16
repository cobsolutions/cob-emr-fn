import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationNComponent } from './observation-n.component';

describe('ObservationNComponent', () => {
  let component: ObservationNComponent;
  let fixture: ComponentFixture<ObservationNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
