import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeqdTestComponent } from './ueqd-test.component';

describe('UeqdTestComponent', () => {
  let component: UeqdTestComponent;
  let fixture: ComponentFixture<UeqdTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeqdTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UeqdTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
