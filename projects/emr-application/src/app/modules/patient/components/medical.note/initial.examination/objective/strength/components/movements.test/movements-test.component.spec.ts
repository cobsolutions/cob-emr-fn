import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsTestComponent } from './movements-test.component';

describe('MovementsTestComponent', () => {
  let component: MovementsTestComponent;
  let fixture: ComponentFixture<MovementsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
