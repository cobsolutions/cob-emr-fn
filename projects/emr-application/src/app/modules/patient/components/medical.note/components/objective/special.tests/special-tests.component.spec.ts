import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialTestsComponent } from './special-tests.component';

describe('SpecialTestsComponent', () => {
  let component: SpecialTestsComponent;
  let fixture: ComponentFixture<SpecialTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
