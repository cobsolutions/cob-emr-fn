import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWithCustomComponent } from './select-with-custom.component';

describe('SelectWithCustomComponent', () => {
  let component: SelectWithCustomComponent;
  let fixture: ComponentFixture<SelectWithCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWithCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectWithCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
