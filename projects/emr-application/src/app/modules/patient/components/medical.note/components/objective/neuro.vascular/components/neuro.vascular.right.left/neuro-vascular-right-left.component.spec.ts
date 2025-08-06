import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuroVascularRightLeftComponent } from './neuro-vascular-right-left.component';

describe('NeuroVascularRightLeftComponent', () => {
  let component: NeuroVascularRightLeftComponent;
  let fixture: ComponentFixture<NeuroVascularRightLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuroVascularRightLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeuroVascularRightLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
