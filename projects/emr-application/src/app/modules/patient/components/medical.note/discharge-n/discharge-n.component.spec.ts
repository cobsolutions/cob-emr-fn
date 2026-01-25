import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeNComponent } from './discharge-n.component';

describe('DischargeNComponent', () => {
  let component: DischargeNComponent;
  let fixture: ComponentFixture<DischargeNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargeNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DischargeNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
