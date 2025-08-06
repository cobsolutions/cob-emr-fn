import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerBodyMyofascialTestComponent } from './lower-body-myofascial-test.component';

describe('LowerBodyMyofascialTestComponent', () => {
  let component: LowerBodyMyofascialTestComponent;
  let fixture: ComponentFixture<LowerBodyMyofascialTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowerBodyMyofascialTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowerBodyMyofascialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
