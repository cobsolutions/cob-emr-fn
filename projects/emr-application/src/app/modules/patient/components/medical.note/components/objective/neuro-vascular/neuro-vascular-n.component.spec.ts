import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuroVascularNComponent } from './neuro-vascular-n.component';

describe('NeuroVascularNComponent', () => {
  let component: NeuroVascularNComponent;
  let fixture: ComponentFixture<NeuroVascularNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeuroVascularNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeuroVascularNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
