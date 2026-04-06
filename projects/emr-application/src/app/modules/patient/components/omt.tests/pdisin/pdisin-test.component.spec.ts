import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdisinTestComponent } from './pdisin-test.component';

describe('PdisinTestComponent', () => {
  let component: PdisinTestComponent;
  let fixture: ComponentFixture<PdisinTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdisinTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdisinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
