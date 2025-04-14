import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalpationComponent } from './palpation.component';

describe('PalpationComponent', () => {
  let component: PalpationComponent;
  let fixture: ComponentFixture<PalpationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalpationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalpationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
