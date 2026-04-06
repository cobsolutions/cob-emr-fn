import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementInputTableComponent } from './measurement-input-table.component';

describe('MeasurementInputTableComponent', () => {
  let component: MeasurementInputTableComponent;
  let fixture: ComponentFixture<MeasurementInputTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementInputTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurementInputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
