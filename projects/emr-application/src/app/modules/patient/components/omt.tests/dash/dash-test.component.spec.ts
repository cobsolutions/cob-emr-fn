import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashTestComponent } from './dash-test.component';

describe('DashTestComponent', () => {
  let component: DashTestComponent;
  let fixture: ComponentFixture<DashTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
