import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchedulerConfigurationComponent } from './list-scheduler-configuration.component';

describe('ListSchedulerConfigurationComponent', () => {
  let component: ListSchedulerConfigurationComponent;
  let fixture: ComponentFixture<ListSchedulerConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSchedulerConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSchedulerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
