import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleMultipleColumnsCheckboxListComponent } from './title-multiple-columns-checkbox-list.component';

describe('TitleMultipleColumnsCheckboxListComponent', () => {
  let component: TitleMultipleColumnsCheckboxListComponent;
  let fixture: ComponentFixture<TitleMultipleColumnsCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleMultipleColumnsCheckboxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleMultipleColumnsCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
