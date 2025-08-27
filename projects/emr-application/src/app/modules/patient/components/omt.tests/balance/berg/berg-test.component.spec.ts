import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BergTestComponent } from './berg-test.component';

describe('BergTestComponent', () => {
  let component: BergTestComponent;
  let fixture: ComponentFixture<BergTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BergTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BergTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
