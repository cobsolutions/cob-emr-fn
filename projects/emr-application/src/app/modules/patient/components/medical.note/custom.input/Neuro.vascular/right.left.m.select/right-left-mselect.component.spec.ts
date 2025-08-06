import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLeftMSelectComponent } from './right-left-mselect.component';

describe('RightLeftMSelectComponent', () => {
  let component: RightLeftMSelectComponent;
  let fixture: ComponentFixture<RightLeftMSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightLeftMSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightLeftMSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
