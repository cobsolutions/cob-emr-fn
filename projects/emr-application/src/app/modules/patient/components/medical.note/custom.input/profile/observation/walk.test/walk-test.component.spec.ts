import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkTestComponent } from './walk-test.component';

describe('WalkTestComponent', () => {
  let component: WalkTestComponent;
  let fixture: ComponentFixture<WalkTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalkTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
