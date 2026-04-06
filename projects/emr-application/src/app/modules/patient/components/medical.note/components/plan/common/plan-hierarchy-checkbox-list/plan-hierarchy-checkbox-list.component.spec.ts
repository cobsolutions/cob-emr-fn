import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanHierarchyCheckboxListComponent } from './plan-hierarchy-checkbox-list.component';

describe('PlanHierarchyCheckboxListComponent', () => {
  let component: PlanHierarchyCheckboxListComponent;
  let fixture: ComponentFixture<PlanHierarchyCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanHierarchyCheckboxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanHierarchyCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
