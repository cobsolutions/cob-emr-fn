import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LefsTestComponent } from './lefs-test.component';

describe('LefsTestComponent', () => {
  let component: LefsTestComponent;
  let fixture: ComponentFixture<LefsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LefsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LefsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
