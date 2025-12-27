import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracesNComponent } from './braces-n.component';

describe('BracesNComponent', () => {
  let component: BracesNComponent;
  let fixture: ComponentFixture<BracesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracesNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BracesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
