import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSeriesAppointmentComponent } from './block-series-appointment.component';

describe('BlockSeriesAppointmentComponent', () => {
  let component: BlockSeriesAppointmentComponent;
  let fixture: ComponentFixture<BlockSeriesAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockSeriesAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockSeriesAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
