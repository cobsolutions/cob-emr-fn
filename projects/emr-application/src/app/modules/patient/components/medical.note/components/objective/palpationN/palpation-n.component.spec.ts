import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalpationNComponent } from './palpation-n.component';

describe('PalpationNComponent', () => {
  let component: PalpationNComponent;
  let fixture: ComponentFixture<PalpationNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalpationNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalpationNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
