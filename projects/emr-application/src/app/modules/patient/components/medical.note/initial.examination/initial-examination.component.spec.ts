import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialExaminationComponent } from './initial-examination.component';

describe('InitialExaminationComponent', () => {
  let component: InitialExaminationComponent;
  let fixture: ComponentFixture<InitialExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
