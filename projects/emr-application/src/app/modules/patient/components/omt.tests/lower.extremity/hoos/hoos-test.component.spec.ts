import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoosTestComponent } from './hoos-test.component';

describe('HoosTestComponent', () => {
  let component: HoosTestComponent;
  let fixture: ComponentFixture<HoosTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoosTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
