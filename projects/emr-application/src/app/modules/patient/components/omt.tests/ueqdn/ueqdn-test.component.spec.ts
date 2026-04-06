import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UeqdnTestComponent } from './ueqdn-test.component';

describe('UeqdnTestComponent', () => {
  let component: UeqdnTestComponent;
  let fixture: ComponentFixture<UeqdnTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UeqdnTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UeqdnTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
