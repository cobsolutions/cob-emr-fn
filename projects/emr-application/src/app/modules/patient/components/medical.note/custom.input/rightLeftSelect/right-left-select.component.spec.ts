import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLeftSelectComponent } from './right-left-select.component';

describe('RightLeftSelectComponent', () => {
  let component: RightLeftSelectComponent;
  let fixture: ComponentFixture<RightLeftSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightLeftSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightLeftSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
