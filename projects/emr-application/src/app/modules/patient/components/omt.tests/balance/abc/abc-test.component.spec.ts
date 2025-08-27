import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcTestComponent } from './abc-test.component';

describe('AbcTestComponent', () => {
  let component: AbcTestComponent;
  let fixture: ComponentFixture<AbcTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbcTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
