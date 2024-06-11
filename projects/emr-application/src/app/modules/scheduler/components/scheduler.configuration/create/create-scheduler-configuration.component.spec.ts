import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchedulerConfigurationComponent } from './create-scheduler-configuration.component';

describe('CreateSchedulerConfigurationComponent', () => {
  let component: CreateSchedulerConfigurationComponent;
  let fixture: ComponentFixture<CreateSchedulerConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchedulerConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSchedulerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
