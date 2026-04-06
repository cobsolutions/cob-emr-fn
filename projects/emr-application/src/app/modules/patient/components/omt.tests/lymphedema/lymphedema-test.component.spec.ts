import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LymphedemaTestComponent } from './lymphedema-test.component';

describe('LymphedemaTestComponent', () => {
  let component: LymphedemaTestComponent;
  let fixture: ComponentFixture<LymphedemaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LymphedemaTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LymphedemaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
