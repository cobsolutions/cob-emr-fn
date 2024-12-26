import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalSettingsComponent } from './time-interval-settings.component';

describe('TimeIntervalSettingsComponent', () => {
  let component: TimeIntervalSettingsComponent;
  let fixture: ComponentFixture<TimeIntervalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeIntervalSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeIntervalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
