import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixMinWalkTestComponent } from './six-min-walk-test.component';

describe('SixMinWalkTestComponent', () => {
  let component: SixMinWalkTestComponent;
  let fixture: ComponentFixture<SixMinWalkTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixMinWalkTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixMinWalkTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
