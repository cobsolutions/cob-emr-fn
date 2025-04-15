import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectiveComponent } from './subjective.component';

describe('SubjectiveComponent', () => {
  let component: SubjectiveComponent;
  let fixture: ComponentFixture<SubjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
