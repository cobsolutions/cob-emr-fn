import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCheckTableComponent } from './measurement-check-table.component';

describe('MeasurementCheckTableComponent', () => {
  let component: MeasurementCheckTableComponent;
  let fixture: ComponentFixture<MeasurementCheckTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementCheckTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementCheckTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
