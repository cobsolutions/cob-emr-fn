import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWeekViewComponent } from './custom-week-view.component';

describe('CustomWeekViewComponent', () => {
  let component: CustomWeekViewComponent;
  let fixture: ComponentFixture<CustomWeekViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomWeekViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
