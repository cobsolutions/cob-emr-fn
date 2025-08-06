import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorLevelFunctionComponent } from './prior-level-function.component';

describe('PriorLevelFunctionComponent', () => {
  let component: PriorLevelFunctionComponent;
  let fixture: ComponentFixture<PriorLevelFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorLevelFunctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorLevelFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
