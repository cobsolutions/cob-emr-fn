import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuroVascularComponent } from './neuro-vascular.component';

describe('NeuroVascularComponent', () => {
  let component: NeuroVascularComponent;
  let fixture: ComponentFixture<NeuroVascularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuroVascularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeuroVascularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
