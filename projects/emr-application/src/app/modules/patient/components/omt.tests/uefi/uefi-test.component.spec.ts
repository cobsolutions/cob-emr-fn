import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UefiTestComponent } from './uefi-test.component';

describe('UefiTestComponent', () => {
  let component: UefiTestComponent;
  let fixture: ComponentFixture<UefiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UefiTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UefiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
