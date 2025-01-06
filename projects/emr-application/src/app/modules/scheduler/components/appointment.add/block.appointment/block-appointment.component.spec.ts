import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAppointmentComponent } from './block-appointment.component';

describe('BlockAppointmentComponent', () => {
  let component: BlockAppointmentComponent;
  let fixture: ComponentFixture<BlockAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
