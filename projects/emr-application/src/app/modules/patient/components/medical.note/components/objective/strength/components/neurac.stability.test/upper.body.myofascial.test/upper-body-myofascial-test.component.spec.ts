import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperBodyMyofascialTestComponent } from './upper-body-myofascial-test.component';

describe('UpperBodyMyofascialTestComponent', () => {
  let component: UpperBodyMyofascialTestComponent;
  let fixture: ComponentFixture<UpperBodyMyofascialTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpperBodyMyofascialTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperBodyMyofascialTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
