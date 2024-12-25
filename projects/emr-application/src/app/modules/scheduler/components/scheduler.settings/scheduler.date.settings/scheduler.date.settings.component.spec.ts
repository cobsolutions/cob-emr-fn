import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDateSettingsComponent } from './scheduler.date.settings.component';

describe('SchedulerDateSettingsComponent', () => {
  let component: SchedulerDateSettingsComponent;
  let fixture: ComponentFixture<SchedulerDateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerDateSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulerDateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
