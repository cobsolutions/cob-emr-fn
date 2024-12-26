import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSettingsComponent } from './week-settings.component';

describe('WeekSettingsComponent', () => {
  let component: WeekSettingsComponent;
  let fixture: ComponentFixture<WeekSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
