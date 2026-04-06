import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DizzhinvTestComponent } from './dizzhinv-test.component';

describe('DizzhinvTestComponent', () => {
  let component: DizzhinvTestComponent;
  let fixture: ComponentFixture<DizzhinvTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DizzhinvTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DizzhinvTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
