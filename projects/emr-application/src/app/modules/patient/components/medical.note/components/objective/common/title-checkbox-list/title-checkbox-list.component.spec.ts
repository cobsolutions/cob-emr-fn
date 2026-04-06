import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCheckboxListComponent } from './title-checkbox-list.component';

describe('TitleCheckboxListComponent', () => {
  let component: TitleCheckboxListComponent;
  let fixture: ComponentFixture<TitleCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleCheckboxListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
