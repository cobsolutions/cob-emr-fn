import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckboxWithChildComponent } from './list-checkbox-with-child.component';

describe('ListCheckboxWithChildComponent', () => {
  let component: ListCheckboxWithChildComponent;
  let fixture: ComponentFixture<ListCheckboxWithChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckboxWithChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCheckboxWithChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
