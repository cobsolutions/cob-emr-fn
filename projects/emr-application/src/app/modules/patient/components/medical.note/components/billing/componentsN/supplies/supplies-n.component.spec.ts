import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesNComponent } from './supplies-n.component';

describe('SuppliesNComponent', () => {
  let component: SuppliesNComponent;
  let fixture: ComponentFixture<SuppliesNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliesNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliesNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
