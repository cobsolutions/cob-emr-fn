import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyCheckboxComponent } from './hierarchy-checkbox.component';

describe('HierarchyCheckboxComponent', () => {
  let component: HierarchyCheckboxComponent;
  let fixture: ComponentFixture<HierarchyCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
