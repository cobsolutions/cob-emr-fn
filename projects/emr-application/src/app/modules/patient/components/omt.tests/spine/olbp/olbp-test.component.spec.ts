import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlbpTestComponent } from './olbp-test.component';

describe('OlbpTestComponent', () => {
  let component: OlbpTestComponent;
  let fixture: ComponentFixture<OlbpTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlbpTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlbpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
