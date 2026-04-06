import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLeftCheckComponent } from './right-left-check.component';

describe('RightLeftCheckComponent', () => {
  let component: RightLeftCheckComponent;
  let fixture: ComponentFixture<RightLeftCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightLeftCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightLeftCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
